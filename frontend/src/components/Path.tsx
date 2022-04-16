import Api from 'helper/api';
import { useEffect, useState } from 'react';
import { GeoJSON, useMap, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import { defaultIcon } from 'assets/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setDestination } from 'ducks/locationsSlice';
import { RootState } from 'ducks/store';

export type PathSegment = GeoJSON.Feature<GeoJSON.MultiLineString, null>;

interface IPath {
  loc: L.LatLng;
}

export const Path = ({ loc }: IPath) => {
  const [pathSegments, setPathSegments] = useState<PathSegment[] | null>(null);
  const api = new Api();
  // const [destination, setDestination] = useState<L.LatLng>();
  const destination = useSelector(
    (state: RootState) => state.locations.destination
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setPathSegments(null); // pga index som key (FIX)

    destination &&
      api
        .fetchShortestPath(loc, new L.LatLng(destination.lat, destination.lng))
        .then((res) => {
          setPathSegments(res);
        });
  }, [destination]);

  const map = useMapEvents({
    click(e) {
      // setDestination(L.latLng([e.latlng.lat, e.latlng.lng]));
      dispatch(setDestination({ lat: e.latlng.lat, lng: e.latlng.lng }));
    },
  });

  return (
    <>
      {pathSegments &&
        pathSegments.map((seg, index) => <GeoJSON key={index} data={seg} />)}
      {destination && (
        <Marker
          position={destination}
          icon={defaultIcon}
          eventHandlers={{
            click: (e) => {
              dispatch(setDestination(null));
            },
          }}
        />
      )}
    </>
  );
};
