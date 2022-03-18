import { useEffect, useState } from 'react';
import { AttrationPoint } from './AttractionMarker';
import Api from 'helper/api';
import { Polygon, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';

type DrivingDistancePolygon = GeoJSON.Feature<
  GeoJSON.Polygon,
  { pointsWithin: AttrationPoint }
>;

export function DrivingDistancePolygon() {
  const api = new Api();
  const [polygon, setPolygon] = useState<DrivingDistancePolygon>();
  const map = useMap();
  const purpleOptions = { color: 'purple' };

  useEffect(() => {
    api.fetchDrivingDistancePolygon().then((data) => {
      setPolygon(data);
    });
  }, []);

  if (polygon) {
    // These next 3 lines purely for debuggins:
    const geojsonObject = L.geoJSON(polygon);
    map.fitBounds(geojsonObject.getBounds());
    // console.log(geojsonObject);
    // end debugging

    return <GeoJSON data={polygon} pathOptions={purpleOptions} />;
  } else {
    return null;
  }
}
