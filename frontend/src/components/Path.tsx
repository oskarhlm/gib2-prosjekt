import Api from 'helper/api';
import { useEffect, useState } from 'react';
import { GeoJSON, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import { defaultIcon } from 'assets/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setDestination } from 'ducks/locationsSlice';
import { RootState } from 'ducks/store';
import { setPathSegments } from 'ducks/pathSlice';

export type PathSegment = GeoJSON.Feature<
  GeoJSON.MultiLineString,
  { gid: string }
>;

interface IPath {
  loc: L.LatLng;
}

export const Path = ({ loc }: IPath) => {
  // const [pathSegments, setPathSegments] = useState<PathSegment[] | null>(null);
  const pathSegments = useSelector((state: RootState) => state.path);
  const api = new Api();
  const destination = useSelector(
    (state: RootState) => state.locations.destination
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPathSegments([]));

    destination.loc &&
      api
        .fetchShortestPath(
          loc,
          L.latLng(destination.loc.lat, destination.loc.lng)
        )
        .then((res: PathSegment[]) => {
          let newSegs: PathSegment[] = [];
          res.forEach((seg) => {
            seg.geometry.type &&
              newSegs.push({
                type: 'Feature',
                geometry: seg.geometry,
                properties: seg.properties,
              });
          });
          dispatch(setPathSegments(newSegs));
        });
  }, [destination]);

  const map = useMapEvents({
    click(e) {
      dispatch(
        setDestination({
          loc: { lat: e.latlng.lat, lng: e.latlng.lng },
          isNew: true,
        })
      );
    },
  });

  return (
    <>
      {pathSegments &&
        pathSegments.map((seg, index) => {
          return <GeoJSON key={seg.properties.gid} data={seg} />;
        })}
      {destination.loc && (
        <Marker
          position={L.latLng(destination.loc.lat, destination.loc.lng)}
          icon={defaultIcon}
          eventHandlers={{
            click: (e) => {
              dispatch(setDestination({ loc: null, isNew: undefined }));
            },
          }}
        />
      )}
    </>
  );
};
