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
  {
    gid: string;
    from_z: number;
    to_z: number;
    seg_length: number;
    agg_cost: number;
  }
>;

interface IPath {
  loc: L.LatLng;
}

export const Path = ({ loc }: IPath) => {
  const pathSegments = useSelector((state: RootState) => state.path);
  const api = new Api();
  const locations = useSelector((state: RootState) => state.locations);
  const dispatch = useDispatch();

  const updatePath = () => {
    dispatch(setPathSegments([]));

    locations.destination.loc &&
      api
        .fetchShortestPath(
          loc,
          L.latLng(locations.destination.loc.lat, locations.destination.loc.lng)
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
  };

  useEffect(() => {
    updatePath();
  }, [locations]);

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
      {locations.destination.loc && (
        <Marker
          position={L.latLng(
            locations.destination.loc.lat,
            locations.destination.loc.lng
          )}
          icon={defaultIcon}
          draggable={true}
          eventHandlers={{
            click: (e) => {
              dispatch(setDestination({ loc: null, isNew: undefined }));
            },
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              marker.setLatLng(new L.LatLng(position.lat, position.lng), {
                draggable: 'true',
              });
              dispatch(
                setDestination({
                  loc: { lat: position.lat, lng: position.lng },
                  isNew: true,
                })
              );
            },
          }}
        />
      )}
    </>
  );
};
