import Api from 'helper/api';
import { useEffect, useState } from 'react';
import { GeoJSONProps, Marker, Popup } from 'react-leaflet';
import { defaultIcon } from 'assets/icons';

export type AttrationPoint = GeoJSON.Feature<GeoJSON.Point, { pid: string }>;

export function AttractionMarker() {
  const api = new Api();
  const [points, setPoints] = useState<AttrationPoint[]>([]);

  useEffect(() => {
    api.fetchAttractions().then((data) => {
      setPoints(data);
    });
  }, []);

  return (
    <>
      {points.map((p) => {
        const [lng, lat] = p.geometry.coordinates; // bytt rekkefølge på høyde/bredde!
        return (
          <Marker
            key={p.properties.pid}
            position={[lat, lng]}
            icon={defaultIcon}
          >
            <Popup>Attraction info!</Popup>
          </Marker>
        );
      })}
    </>
  );
}
