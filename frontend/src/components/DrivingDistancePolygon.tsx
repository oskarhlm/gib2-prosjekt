import { createRef, useEffect, useState, useRef, useCallback } from 'react';
import { POI } from './POIMarker';
import Api from 'helper/api';
import { Polygon, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/store';
import drivingDistanceSlice, {
  DrivingDistanceState,
} from 'ducks/drivingDistanceSlice';

type DrivingDistancePolygon = GeoJSON.Feature<
  GeoJSON.Polygon,
  { pointsWithin: POI[] }
>;

export function DrivingDistancePolygon({
  showPolygon,
  setShowPolygon,
}: {
  showPolygon: boolean;
  setShowPolygon: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const api = new Api();
  const [polygon, setPolygon] = useState<DrivingDistancePolygon>();
  const polygonOptions = {
    color: 'purple',
    opacity: 0.8,
    fillColor: 'purple',
    fillOpacity: 0.1,
  };
  const settings = useSelector((state: RootState) => state.drivingDistance);
  const loc = useSelector((state: RootState) => state.locations.userLocation);
  const geoJsonLayer = useRef<L.GeoJSON<any>>(null);

  const updatePolygon = (input: DrivingDistanceState) => {
    setShowPolygon(false);
    api
      .fetchDrivingDistancePolygon(input)
      .then((data: DrivingDistancePolygon) => {
        setPolygon(data);
        if (geoJsonLayer.current && polygon) {
          geoJsonLayer.current.clearLayers().addData(data);
        }
        setShowPolygon(true);
      });
  };

  useEffect(() => {
    setPolygon(undefined);
    if (settings && showPolygon) {
      const input: typeof settings = {
        ...settings,
        startPosition: [loc.lng, loc.lat],
      };
      updatePolygon(input);
    }
  }, [settings, loc]);

  if (polygon && showPolygon) {
    return (
      <>
        <GeoJSON
          data={polygon}
          pathOptions={polygonOptions}
          ref={geoJsonLayer}
        />
      </>
    );
  } else {
    return null;
  }
}
