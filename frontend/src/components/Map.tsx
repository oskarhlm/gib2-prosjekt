import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { SettingsDrawer } from './SettingsDrawer';
import { POIMarker } from './POIMarker';
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
import { UserDestinationButton } from './UserDestination';

export const Map = () => {
  const settings = useSelector((state: RootState) => state.drivingDistance);
  const location = useSelector(
    (state: RootState) => state.locations.userLocation
  );

  return (
    <div>
      <ButtonRow>
        <SettingsDrawer />
        <UserDestinationButton />
      </ButtonRow>
      <MapContainer center={[63.4346, 10.3985]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <DrivingDistancePolygon />
        <POIMarker />
        {location && <Path loc={L.latLng(location)} />}
        <Locate />
      </MapContainer>
    </div>
  );
};
