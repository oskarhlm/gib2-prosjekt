import { useEffect, useState } from 'react';
import { Polygon, GeoJSON, useMap, Marker } from 'react-leaflet';
import L, { icon, latLng, Popup } from 'leaflet';
import { defaultIcon } from 'assets/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setLocation } from 'ducks/locationSlice';
import { RootState } from 'ducks/store';

interface ILocate {
  setLoc: React.Dispatch<React.SetStateAction<[number, number] | null>>;
}

export function Locate(props: ILocate) {
  const map = useMap();
  // const loc = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch();

  useEffect(() => {
    const loc = map.locate({ setView: true });
    map.on('locationfound', function (locationEvent) {
      const lat = locationEvent.latlng.lat;
      const lng = locationEvent.latlng.lng;
      props.setLoc([lat, lng]);
      console.log(JSON.stringify({ lat, lng }));
      dispatch(setLocation({ lat, lng }));
      L.marker([lat, lng], { icon: defaultIcon })
        .addTo(map)
        .bindPopup('DU ER HER!!!!!!!!!!!!!!!!');
    });
  }, []);

  return null;
}
