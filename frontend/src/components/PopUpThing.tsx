/*
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L, { LatLngExpression, LatLngTuple } from 'leaflet';

const position: LatLngExpression= [63.5346, 10.3985]

export function PopupExample() {
  return (
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
  )
}
*/

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L, { LatLngExpression, LatLngTuple } from 'leaflet';


export function PopUpThing() {
  {/*
  const OpenMenu = () => {
    <SettingsDrawer />;
  };
  
  handleClick() {
    console.log('Click happened');
  }

   */}
  const position: LatLngExpression= [63.5346, 10.3985]
  return (
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable. Click this to confirm placement.
        </Popup>
      </Marker>

  )
}



