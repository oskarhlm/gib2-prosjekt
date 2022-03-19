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
import { ButtonRow } from './ButtonRow';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

export const Map = () => {
  const settings = useSelector((state: RootState) => state.drivingDistance);
  const location = useSelector((state: RootState) => state.location);

  return (
    <div>
      <ButtonRow>
        <SettingsDrawer />
        <Button onClick={() => alert('yo mama')}>Press me</Button>
        <Button style={{ backgroundColor: 'coral', color: 'white' }}>
          Lagre destinasjon
        </Button>
      </ButtonRow>
      <MapContainer center={[63.4346, 10.3985]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <DrivingDistancePolygon />
        <AttractionMarker />
        {location && <Path loc={L.latLng(location)} />}
        <Locate />
      </MapContainer>
    </div>
  );
};
