import { useEffect, useState } from 'react';
import { Polygon, GeoJSON, useMap, Marker } from 'react-leaflet';
import L, { icon, latLng, Popup } from 'leaflet';
import { defaultIcon } from 'assets/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setLocation } from 'ducks/locationSlice';
import { RootState } from 'ducks/store';

export function Locate() {
  const map = useMap();
  const loc = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 14 });
    map.on('locationfound', function (locationEvent) {
      const lat = locationEvent.latlng.lat;
      const lng = locationEvent.latlng.lng;
      dispatch(setLocation({ lat, lng }));
      L.marker([lat, lng], { icon: defaultIcon })
        .addTo(map)
        .bindPopup('Du er her');
    });
  }, []);

  return null;
}
