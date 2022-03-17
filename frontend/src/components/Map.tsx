import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { SettingsDrawer } from './SettingsDrawer';
import { AttractionMarker } from './AttractionMarker';
import { DrivingDistancePolygon } from './DrivingDistancePolygon';
import { Path } from './Path';
import Api from 'helper/api';
import { useEffect } from 'react';

export function Map() {
  // useEffect(() => {
  //   const api = new Api();
  //   api.fetchShortestPath().then((res) => {
  //     console.log(res);
  //   });
  // });

  return (
    <div>
      <SettingsDrawer />
      <MapContainer center={[63.4346, 10.3985]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <AttractionMarker />
        <DrivingDistancePolygon />
        <Path />
      </MapContainer>
    </div>
  );
}
