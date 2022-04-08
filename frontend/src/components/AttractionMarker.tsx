import Api from 'helper/api';
import { useEffect, useState } from 'react';
import { Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import { defaultIcon } from 'assets/icons';
import L, { Draggable, featureGroup } from 'leaflet';


import React, {useRef,useMemo,useCallback} from 'react';
import { LatLngExpression, LatLngTuple,} from 'leaflet';
import { AddLocationDrawer } from './AddLocationDrawer';

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

  const center2 = {
    lat: 51.505,
    lng: -0.09,
  }
  let canAddPoints=true

const center: LatLngExpression = [63.45, 10.4200]
  /*
  const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef<any>(center)
    const eventHandlers = useMemo(
        () => ({
        dragend() {
            const Marker = markerRef.current
            if (Marker != null) {
                setPosition(Marker.getLatLng())
            }
        },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])
    */
    const onClickMarker = () => {
      canAddPoints=(!canAddPoints);
      return AddLocationDrawer;
    };

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
              L.marker(latlng, { icon: defaultIcon,draggable:true}, 
              
                /*
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                */
                        ).on('click',onClickMarker)
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
