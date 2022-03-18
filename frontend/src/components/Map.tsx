import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { SettingsDrawer } from './SettingsDrawer';
import { AttractionMarker } from './AttractionMarker';
import { DrivingDistancePolygon } from './DrivingDistancePolygon';
import { Path } from './Path';
import { Locate } from './Locate';
import Api from 'helper/api';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { updateSettings } from 'ducks/drivingDistanceSlice';
import store, { RootState } from 'ducks/store';

export function Map() {
  const [loc, setLoc] = useState<[number, number] | null>(null);
  const settings = useSelector((state: RootState) => state.drivingDistance);
  const location = useSelector((state: RootState) => state.location);

  return (
    <div>
      <h1>{JSON.stringify(settings)}</h1>
      <h1>{JSON.stringify(location)}</h1>
      <SettingsDrawer />
      <MapContainer center={[63.4346, 10.3985]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <AttractionMarker />
        <DrivingDistancePolygon />
        {loc && <Path loc={L.latLng(loc)} />}
        <Locate setLoc={setLoc} />
      </MapContainer>
    </div>
  );
}
