import { createRef, useEffect, useState, useRef, useCallback } from 'react';
import { AttrationPoint } from './AttractionMarker';
import Api from 'helper/api';
import { Polygon, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import store, { RootState } from 'ducks/store';
import drivingDistanceSlice, {
  DrivingDistanceState,
} from 'ducks/drivingDistanceSlice';

type DrivingDistancePolygon = GeoJSON.Feature<
  GeoJSON.Polygon,
  { pointsWithin: AttrationPoint }
>;

export function DrivingDistancePolygon() {
  const api = new Api();
  const [polygon, setPolygon] = useState<DrivingDistancePolygon>();
  const map = useMap();
  const purpleOptions = { color: 'purple' };
  const settings = useSelector((state: RootState) => state.drivingDistance);
  const loc = useSelector((state: RootState) => state.location);
  const geoJsonLayer = useRef<L.GeoJSON<any>>(null);

  const updatePolygon = (input: DrivingDistanceState) => {
    api
      .fetchDrivingDistancePolygon(input)
      .then((data: DrivingDistancePolygon) => {
        setPolygon(data);
        if (geoJsonLayer.current && polygon) {
          geoJsonLayer.current.clearLayers().addData(data);
        }
      });
  };

  useEffect(() => {
    if (settings) {
      const input: typeof settings = {
        ...settings,
        startPosition: [loc.lng, loc.lat],
      };
      console.log(input);
      updatePolygon(input);
    }
  }, [settings]);

  if (polygon) {
    const geojsonObject = L.geoJSON(polygon);
    map.fitBounds(geojsonObject.getBounds());

    return (
      <GeoJSON data={polygon} pathOptions={purpleOptions} ref={geoJsonLayer} />
    );
  } else {
    return null;
  }

  // return (
  //   <>
  //     {polygon && (
  //       <GeoJSON
  //         data={polygon}
  //         pathOptions={purpleOptions}
  //         ref={geoJsonLayer}
  //       />
  //     )}
  //   </>
  // );
}
