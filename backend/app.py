from contextlib import closing
from glob import escape
from pydoc import resolve
from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import json
from config import config


app = Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False


def get_connection():
    return psycopg2.connect(**config())


@app.route('/')
def hello_world():
    return 'Hello, world!'


@app.route('/<name>')
def hello(name):
    return f"Hello, {escape(name)}"


@app.route('/attractions')
def get_attractions():
    conn = get_connection()
    with closing(conn.cursor()) as cur:
        cur.execute(
            'select json_agg(st_asgeojson(points.*)::json) \
                from (select pid, st_transform(geom, 4326) from point) as points'
        )
        rows = cur.fetchone()[0]
    return jsonify(rows)


@app.route('/path', methods=['GET', 'POST'])
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


@app.route('/driving-distance', methods=['POST'])
def get_dd_polygon_and_points_within():
    conn = get_connection()
    res = json.loads(request.data)
    print(res)
    with closing(conn.cursor()) as cur:
        # cur.execute(
        #     'select * \
        #     from get_polygon_and_points_within_geojson(\
        #     (select geom from get_dd_polygon(270337.87, 7041814.2, 25833, 12)));'
        # )
        cur.execute(
            f'select * \
            from get_polygon_and_points_within_geojson(\
            (select geom from get_dd_polygon( \
                {res.get("startPosition")[0]}, \
                {res.get("startPosition")[1]}, \
                4326, {res.get("maxMinutes")})));'
        )
        rows = cur.fetchone()[0]
    # print(json.dumps(rows, indent=4))
    response = jsonify(rows)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run(debug=True)
