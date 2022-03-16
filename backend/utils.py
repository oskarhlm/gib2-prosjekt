def to_geoJSON(query: str):
    return f'select json_agg(ST_AsGeoJSON(s.*)::json) \
            from ({query}) as s;'


# def wkb_to_geoJSON(wkb: str):
#     return
