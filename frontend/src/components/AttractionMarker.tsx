import Api from 'helper/api';
import { useEffect, useState } from 'react';
import { Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import { defaultIcon } from 'assets/icons';
import L from 'leaflet';

export type AttrationPoint = GeoJSON.Feature<GeoJSON.Point, { pid: string }>;

export function AttractionMarker() {
  const api = new Api();
  const [points, setPoints] = useState<AttrationPoint[]>([]);
  const map = useMap();

  useEffect(() => {
    api.fetchAttractions().then((data) => {
      setPoints(data);
    });
  }, []);

  return (
    <>
      {points.map((p) => {
        return (
          <GeoJSON
            key={p.properties.pid}
            data={p}
            style={(p) => ({ color: 'green' })}
            pointToLayer={(feature, latlng) =>
              // new L.CircleMarker(latlng, {
              //   radius: 5,
              //   fillOpacity: 0.85,
              // })
              L.marker(latlng, { icon: defaultIcon })
            }
            onEachFeature={(feature, layer) =>
              layer.bindPopup(`Layer ${p.properties.pid}`)
            }
          />
          // <Marker
          //   key={p.properties.pid}
          //   // @ts-ignore
          //   position={L.GeoJSON.coordsToLatLng(p.geometry.coordinates)}
          //   icon={defaultIcon}
          // >
          //   <Popup>Attraction info!</Popup>
          // </Marker>
        );
      })}
    </>
  );
}
