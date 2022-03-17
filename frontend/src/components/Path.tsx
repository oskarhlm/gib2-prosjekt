import Api from 'helper/api';
import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

export type PathSegment = GeoJSON.Feature<GeoJSON.MultiLineString, null>;

export function Path() {
  const [pathSegments, setPathSegments] = useState<PathSegment[]>();
  const api = new Api();

  useEffect(() => {
    api.fetchShortestPath().then((res) => {
      setPathSegments(res);
    });
  });

  return (
    <>{pathSegments && pathSegments.map((seg) => <GeoJSON data={seg} />)}</>
  );
}
