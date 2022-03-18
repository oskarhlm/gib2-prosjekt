import Api from 'helper/api';
import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

export type PathSegment = GeoJSON.Feature<GeoJSON.MultiLineString, null>;

// interface IPath {
//   loc: [number, number];
// }

export function Path() {
  const [pathSegments, setPathSegments] = useState<PathSegment[]>();
  const api = new Api();

  useEffect(() => {
    // api.fetchShortestPath().then((res) => {
    //   setPathSegments(res);
    // });
    api
      .fetchShortestPath(
        new L.LatLng(270337.87, 7041814.2),
        new L.LatLng(272956.1, 7038904.65)
      )
      .then((res) => setPathSegments(res));
  }, []);

  return (
    <>
      {pathSegments &&
        pathSegments.map((seg, index) => <GeoJSON key={index} data={seg} />)}
    </>
  );
}
