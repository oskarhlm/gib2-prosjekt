import psycopg2
import json
from config import config
from utils import to_geoJSON


def connect():
    conn = None
    try:
        params = config()
        print("Connecting...")
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute('SELECT version()')
        # cur.execute(to_geoJSON(
        #     'select * from get_dd_polygon(270337.87, 7041814.2, 25833, 12)'
        # ))
        # cur.execute(
        #     'select * from get_dd_polygon(270337.87, 7041814.2, 25833, 12)'
        # )
        # cur.execute(
        #     'select * \
        #     from get_polygon_and_points_within_geojson(\
        #     (select geom from get_dd_polygon(270337.87, 7041814.2, 25833, 12)));'
        # )
        cur.execute(
            'select * from shortest_bike_path(270337.87, 7041814.2, 272956.1, 7038904.65, 25833);'
        )
        rows = cur.fetchone()
        print(json.dumps(rows, indent=4))
        cur.close()

    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print("Connection closed")


if __name__ == '__main__':
    connect()
