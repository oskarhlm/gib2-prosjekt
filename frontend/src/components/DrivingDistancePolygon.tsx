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

export function DrivingDistancePolygon() {
  const api = new Api();
  const [polygon, setPolygon] = useState<DrivingDistancePolygon>();
  const pointsWithin = polygon?.properties.pointsWithin;
  const map = useMap();
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
    api
      .fetchDrivingDistancePolygon(input)
      .then((data: DrivingDistancePolygon) => {
        setPolygon(data);
        if (geoJsonLayer.current && polygon) {
          geoJsonLayer.current.clearLayers().addData(data);
        }
        // if (polygonRef.current && polygon) {
        //   polygonRef.current.clearLayers();
        // }
      });
  };

  useEffect(() => {
    if (settings) {
      const input: typeof settings = {
        ...settings,
        startPosition: [loc.lng, loc.lat],
      };
      updatePolygon(input);
    }
  }, [settings]);

  if (polygon) {
    const geojsonObject = L.geoJSON(polygon);
    // map.flyToBounds(geojsonObject.getBounds());

    return (
      <>
        <GeoJSON
          data={polygon}
          pathOptions={polygonOptions}
          ref={geoJsonLayer}
        />
        {/* {pointsWithin && pointsWithin.map((point) => <GeoJSON data={point} />)} */}
      </>
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
