from contextlib import closing
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import psycopg2
import json
from config import config


app = Flask(
    __name__,
    static_url_path="",
    static_folder="../frontend/build",
    template_folder="../frontend/build",
)
CORS(app, support_credentials=True)


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add(
        "Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"
    )
    return response


app.config["JSON_SORT_KEYS"] = False


def get_connection():
    connection = psycopg2.connect(**config())
    connection.autocommit = True
    return connection


@app.route("/")
def hello_world():
    return send_from_directory(app.static_folder, "index.html")


# @app.route("/<path:path>")
# def static_proxy(path):
#     """static folder serve"""
#     file_name = path.split("/")[-1]
#     dir_name = os.path.join(app.static_folder, "/".join(path.split("/")[:-1]))
#     return send_from_directory(dir_name, file_name)


@app.route("/api/attractions/", methods=["GET", "POST"])
def get_attractions():
    conn = get_connection()
    if request.method == "GET":
        point_classes = request.args.get("pointClasses").split(",")
        with closing(conn.cursor()) as cur:
            cur.execute(
                f"select json_agg(st_asgeojson(points.*)::json) \
                    from (  select id, geom, name, fclass \
                            from points_of_interest \
                            where fclass in {tuple(point_classes)}) as points;"
            )
            rows = cur.fetchone()[0]
        return jsonify(rows)

    if request.method == "POST":
        res = json.loads(request.data)
        with closing(conn.cursor()) as cur:
            cur.execute(
                f"insert into points_of_interest (name, fclass, geom) \
                    values ( \
                        '{res.get('title')}', \
                        '{res.get('category')}', \
                        st_pointfromtext('POINT({res.get('geography')[1]} {res.get('geography')[0]})', 4326) \
                    );"
            )
        return {}


@app.route("/api/pointOfInterestCategories")
def get_POI_categories():
    conn = get_connection()
    with closing(conn.cursor()) as cur:
        cur.execute("select json_agg(distinct fclass) from points_of_interest;")
        rows = cur.fetchone()[0]
    return jsonify(rows)


@app.route("/api/path", methods=["GET", "POST"])
def get_shortest_path():
    conn = get_connection()
    res = json.loads(request.data)
    with closing(conn.cursor()) as cur:
        cur.execute(
            f"select * \
            from shortest_bike_path({res.get('startLng')}, {res.get('startLat')}, \
                {res.get('endLng')}, {res.get('endLat')}, 4326);"
        )
        rows = cur.fetchone()[0]
    return jsonify(rows)


@app.route("/api/driving-distance", methods=["POST"])
def get_dd_polygon_and_points_within():
    conn = get_connection()
    res = json.loads(request.data)
    print(res)
    with closing(conn.cursor()) as cur:
        cur.execute(
            f'select * \
            from get_polygon_and_points_within_geojson(\
            (select geom from get_dd_polygon( \
                {res.get("startPosition")[0]}, \
                {res.get("startPosition")[1]}, \
                4326, {res.get("maxMinutes")})));'
        )
        rows = cur.fetchone()[0]
    response = jsonify(rows)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run(debug=True)
