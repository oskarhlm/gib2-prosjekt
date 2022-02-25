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
        #cur.execute('SELECT version()')
        cur.execute('select geom::geometry::json from vbase_50_punkt limit 3;')
        rows = cur.fetchall()
        for row in rows:
            y = json.loads(json.dumps(row[0]))
            print(y['coordinates'])
        cur.close()

    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print("Connection closed")

if __name__ == '__main__':
    connect()