import psycopg2
import json
from config import config


def connect():
    conn = None
    try:
        params = config()
        print("connecting...")
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute('SELECT version()')
        cur.execute("select json_agg(ST_AsGeoJSON(s.*)::json) \
                    from (select fartsgrens, typeveg, slope, geom from streets limit 3) as s;")
        # cur.execute("SELECT jsonb_build_object( \
        #                 'type',       'Feature', \
        #                 'id',         id, \
        #                 'geometry',   ST_AsGeoJSON(geom)::jsonb, \
        #                 'properties', to_jsonb( t.* ) - 'id' - 'geom' \
        #                 ) AS json \
        #             FROM point AS t(id, name, geom);")
        rows = cur.fetchone()[0]
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
