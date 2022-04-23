import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import user from 'assets/person.png';

export const defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [26, 40],
  iconAnchor: [13, 40],
  popupAnchor: [0, -40],
});

export const userIcon = L.icon({
  iconUrl: user,
  iconSize: [50, 60],
  iconAnchor: [25, 60],
  popupAnchor: [0, -60],
});
