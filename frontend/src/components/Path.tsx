import Api from 'helper/api';
import { useEffect, useState } from 'react';
import { GeoJSON, useMap, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import { defaultIcon } from 'assets/icons';

export type PathSegment = GeoJSON.Feature<GeoJSON.MultiLineString, null>;

interface IPath {
  loc: L.LatLng;
}

export function Path({ loc }: IPath) {
  const [pathSegments, setPathSegments] = useState<PathSegment[] | null>(null);
  const api = new Api();
  const [destination, setDestination] = useState<L.LatLng>();

  useEffect(() => {
    // api.fetchShortestPath().then((res) => {
    //   setPathSegments(res);
    // });
    console.log(loc, destination);
    setPathSegments(null); // pga index som key (FIX)

    destination &&
      api.fetchShortestPath(loc, destination).then((res) => {
        console.log(res);
        setPathSegments(res);
      });
  }, [destination]);

  const map = useMapEvents({
    click(e) {
      setDestination(L.latLng([e.latlng.lat, e.latlng.lng]));
    },
  });

  return (
    <>
      {pathSegments &&
        pathSegments.map((seg, index) => <GeoJSON key={index} data={seg} />)}
      {destination && <Marker position={destination} icon={defaultIcon} />}
    </>
  );
}
