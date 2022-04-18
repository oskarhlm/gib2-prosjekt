import Api from 'helper/api';
import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { defaultIcon } from 'assets/icons';
import L from 'leaflet';
import { useDispatch } from 'react-redux';
import { setDestination } from 'ducks/locationsSlice';
import { Button } from 'antd';

export type POI = GeoJSON.Feature<
  GeoJSON.Point,
  { id: number; name: string; fclass: string }
>;

export function POIMarker() {
  const api = new Api();
  const [points, setPoints] = useState<POI[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    api.fetchPointsOfInterest().then((data) => {
      setPoints(data);
    });
  }, []);

  const handleFindPath = (p: POI) => {
    dispatch(
      setDestination({
        loc: { lat: p.geometry.coordinates[0], lng: p.geometry.coordinates[1] },
        isNew: false,
      })
    );
  };

  return (
    <>
      {points.map((p) => {
        return (
          <Marker
            key={p.properties.id}
            position={L.latLng(
              p.geometry.coordinates.reverse() as [number, number]
            )}
            icon={defaultIcon}
          >
            <Popup>
              <div>
                <h3>
                  {p.properties.name} ({p.properties.fclass})
                </h3>
                <Button size="small" onClick={() => handleFindPath(p)}>
                  Veiviser
                </Button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
