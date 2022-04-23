import {
  LayerGroup,
  MapContainer,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import { SettingsDrawer, SettingsForm } from './SettingsDrawer';
import { POIMarker } from './POIMarker';
import { DrivingDistancePolygon } from './DrivingDistancePolygon';
import { Path } from './Path';
import { Locate } from './Locate';
import Api from 'helper/api';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { updateSettings } from 'ducks/drivingDistanceSlice';
import store, { RootState } from 'ducks/store';
import { ButtonRow } from './ButtonRow';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { UserDestinationButton } from './UserDestination';
import HeightLineChart from './HeightLineChart';

export const Map = () => {
  const settings = useSelector((state: RootState) => state.drivingDistance);
  const location = useSelector(
    (state: RootState) => state.locations.userLocation
  );
  const [showPolygon, setShowPolygon] = useState(false);

  return (
    <div>
      <div
        style={{
          width: 'auto',
          height: 'auto',
          zIndex: 1000,
          position: 'absolute',
          padding: 10,
          margin: 10,
        }}
      >
        <div style={{ height: 60, width: 'auto' }}>
          <ButtonRow>
            {/* <SettingsDrawer /> */}
            <UserDestinationButton />
          </ButtonRow>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            height: 'auto',
            width: 300,
            paddingInline: 20,
            paddingTop: 20,
            paddingBottom: 5,
            borderRadius: 20,
          }}
        >
          <SettingsForm
            showPolygon={showPolygon}
            setShowPolygon={setShowPolygon}
          />
        </div>
      </div>
      <MapContainer center={[63.4346, 10.3985]} zoom={13} zoomControl={false}>
        <HeightLineChart />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <POIMarker />
        <DrivingDistancePolygon
          showPolygon={showPolygon}
          setShowPolygon={setShowPolygon}
        />
        {location && <Path loc={L.latLng(location)} />}
        <Locate />
      </MapContainer>
    </div>
  );
};
