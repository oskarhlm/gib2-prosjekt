import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export const defaultIcon = L.icon({
  //iconUrl: icon,
  iconUrl:"https://play-lh.googleusercontent.com/eNustQYcjMXlZAteHQmdB6E2r0-E0cl3utGPvO51ZC-50rhqkYFTuhVp4ip_tZL-la8",
  //iconUrl: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  //iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  shadowUrl: iconShadow,
  //shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  iconSize: [26, 40],
  iconAnchor: [13, 40],
  popupAnchor: [0, -40],
});

export const startPositionIcon=L.icon({
  iconUrl:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  //iconUrl:"https://play-lh.googleusercontent.com/eNustQYcjMXlZAteHQmdB6E2r0-E0cl3utGPvO51ZC-50rhqkYFTuhVp4ip_tZL-la8",
  shadowUrl:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  iconSize: [26, 40],
  iconAnchor: [13, 40],
  popupAnchor: [0, -40],
})

export const directions_bike=L.icon({
  //iconUrl:"https://fonts.googleapis.com/icon?family=Material+Icons",
  iconUrl:"https://img.favpng.com/20/11/24/google-map-maker-google-maps-computer-icons-map-collection-png-favpng-BNWkuCw9tdsBqxLR2PTzGbS6V.jpg",
  shadowUrl:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  iconSize: [26, 40],
  iconAnchor: [13, 40],
  popupAnchor: [0, -40],
})
