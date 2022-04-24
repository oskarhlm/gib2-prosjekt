import { useEffect, useState } from 'react';
import { Polygon, GeoJSON, useMap, Marker } from 'react-leaflet';
import L, { icon, latLng, Popup } from 'leaflet';
import { defaultIcon,startPositionIcon } from 'assets/icons';
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
    L.marker([lat, lng], { icon: startPositionIcon })
      .addTo(map)
      .bindPopup('Du er her');
  }, []);

  return null;
}
