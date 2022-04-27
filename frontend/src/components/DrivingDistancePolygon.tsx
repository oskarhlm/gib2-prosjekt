import { useEffect, useRef } from 'react';
import { POI } from './POIMarker';
import Api from 'helper/api';
import { Polygon, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'ducks/store';
import { setPolygon, setShowPolygon } from 'ducks/polygonSlice';

export type Polygon = GeoJSON.Feature<GeoJSON.Polygon, { pointsWithin: POI[] }>;

export function DrivingDistancePolygon() {
  const api = new Api();
  const polygonState = useSelector((state: RootState) => state.polygon);
  const dispatch = useDispatch();
  const polygonOptions = {
    color: 'purple',
    opacity: 0.8,
    fillColor: 'purple',
    fillOpacity: 0.1,
  };
  const settings = useSelector((state: RootState) => state.polygon.settings);
  const loc = useSelector((state: RootState) => state.locations.userLocation);
  const geoJsonLayer = useRef<L.GeoJSON<any>>(null);

  const updatePolygon = (input: typeof settings) => {
    dispatch(setShowPolygon(false));
    api.fetchDrivingDistancePolygon(input).then((data: Polygon) => {
      dispatch(setPolygon(data));
      if (geoJsonLayer.current && polygonState.polygon) {
        geoJsonLayer.current.clearLayers().addData(data);
      }
      dispatch(setShowPolygon(true));
    });
  };

  useEffect(() => {
    dispatch(setPolygon(null));
    if (settings && polygonState.showPolygon) {
      const input: typeof settings = {
        ...settings,
        startPosition: [loc.lng, loc.lat],
      };
      updatePolygon(input);
    }
  }, [settings, loc]);

  if (polygonState.polygon && polygonState.showPolygon) {
    return (
      <>
        <GeoJSON
          data={polygonState.polygon}
          pathOptions={polygonOptions}
          ref={geoJsonLayer}
        />
      </>
    );
  } else {
    return null;
  }
}
