import {
  Circle,
  CircleMarker,
  MapContainer,
  Polyline,
  Polygon,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet'
import L, { LatLngExpression, LatLngTuple } from 'leaflet';

import CSS from 'csstype';

const polyline: LatLngExpression[] = [
  [63.4346, 10.3985],
  [63.42, 10.4085],
  [63.45, 10.4200],
  [63.45, 10.4202],
]

const multiPolyline: LatLngExpression[][] = [
  [
    [63.32, 10.3085],
    [63.35, 10.3200],
    [63.35, 10.3202],
  ],
  [    
    [63.32, 10.3085],
    [63.35, 10.3200],
    [63.35, 10.3202],
  ],
]

const polygon: LatLngExpression[]= [
  [63.5346, 10.3985],
  [63.52, 10.4085],
  [63.55, 10.4200],
  [63.55, 10.4202],
]

const multiPolygon: LatLngExpression[][]= [
  [[63.5346, 10.3985],
  [63.52, 10.4085],
  [63.55, 10.4200],
  [63.55, 10.4202],
  ],
  
  [[63.5546, 10.3985],
  [63.53, 10.4385],
  [63.54, 10.4300],
  [63.54, 10.4302],
  ],
  
]

const rectangle: [number, number][]=[
  [51.49, -0.08],
  [51.5, -0.06],
]

const center = L.latLng(63.325, 10.309);

const fillBlueOptions = { fillColor: 'blue' }
const blackOptions = { color: 'black' }
const limeOptions = { color: 'lime' }
const purpleOptions = { color: 'purple' }
const redOptions = { color: 'red', fillColor: 'orange' }


const person = {
  firstName: "John",
  lastName: "Doe",
  id: 5566,
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

const multiPolygonet={
  
}


export function VectorLayersExample() {
  return (
  <div>   
  <p>asdf</p>
  <p id="demo">qwerty</p>

  <script>
  document.getElementById("demo").innerHTML = "Hello JavaScript!";
  </script> 
    <MapContainer center={[63.4346, 10.3985]} zoom={13} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle center={center} pathOptions={fillBlueOptions} radius={200}/>
      <CircleMarker
        center={[63.4346, 10.4085]}
        pathOptions={redOptions}
        radius={20}>
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker>
      <CircleMarker
        center={[63.44, 10.4085]}
        pathOptions={redOptions}
        radius={20}>
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker>
      <Polyline pathOptions={limeOptions} positions={polyline} />
      <Polyline pathOptions={limeOptions} positions={multiPolyline} />
      <Polygon pathOptions={purpleOptions} positions={polygon} />
      <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
      <Rectangle bounds={rectangle} pathOptions={blackOptions} />
    </MapContainer>
    </div>
  )
}
