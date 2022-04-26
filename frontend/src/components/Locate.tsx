import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { userIcon } from 'assets/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setUserLocation } from 'ducks/locationsSlice';
import { RootState } from 'ducks/store';

export function Locate() {
  const map = useMap();
  const loc = useSelector((state: RootState) => state.locations.userLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    // map.locate({ setView: true, maxZoom: 14 });
    // map.on('locationfound', function (locationEvent) {
    //   const lat = locationEvent.latlng.lat;
    //   const lng = locationEvent.latlng.lng;
    //   dispatch(setLocation({ lat, lng }));
    //   L.marker([lat, lng], { icon: defaultIcon })
    //     .addTo(map)
    //     .bindPopup('Du er her');
    // });
    const lat = 63.430515;
    const lng = 10.395053;
    dispatch(setUserLocation({ lat, lng }));
    const marker = L.marker([lat, lng], { icon: userIcon, draggable: true });
    marker.on('dragend', (e) => {
      const marker = e.target;
      const position = marker.getLatLng();
      marker.setLatLng(new L.LatLng(position.lat, position.lng), {
        draggable: 'true',
      });
      dispatch(setUserLocation({ lat: position.lat, lng: position.lng }));
      map.panTo(new L.LatLng(position.lat, position.lng));
    });
    marker.addTo(map).bindPopup('Du er her');
  }, []);

  return null;
}
