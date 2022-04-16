import Api from 'helper/api';
import { useEffect, useState } from 'react';
import { Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import { defaultIcon } from 'assets/icons';
import L from 'leaflet';

export type AttrationPoint = GeoJSON.Feature<
  GeoJSON.Point,
  { id: number; name: string; fclass: string }
>;

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
            key={p.properties.id}
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
              layer.bindPopup(
                p.properties.name
                  ? `${p.properties.name} (${p.properties.fclass})`
                  : `${p.properties.fclass} (ukjent navn)`
              )
            }
          />
        );
      })}
    </>
  );
}
