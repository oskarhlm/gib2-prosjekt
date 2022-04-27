import {
  LayerGroup,
  MapContainer,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import { SettingsDrawer } from './SettingsDrawer';
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
import { Button, Form, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { UserDestinationButton } from './UserDestination';
import { UserDestinationButton2 } from './Kategorier2';



const { Header, Footer, Sider, Content } = Layout;

export const Map = () => {
  const settings = useSelector((state: RootState) => state.drivingDistance);
  const location = useSelector(
    (state: RootState) => state.locations.userLocation
  );
  const polygonGroup = L.layerGroup();
  const polygonRef = useRef(polygonGroup);

  return (
    <div>
      
    <Layout>

      <Content>
      <ButtonRow>
        <SettingsDrawer />
        {/*<SettingsDrawer2 />*/}
        <UserDestinationButton />
        <UserDestinationButton2 />
      </ButtonRow>
      <MapContainer center={[63.4346, 10.3985]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <POIMarker />
        <DrivingDistancePolygon />
        {location && <Path loc={L.latLng(location)} />}
        <Locate />
      </MapContainer>
      
      <Form
          initialValues={{
            roundTrip: false,
            maxSlope: 30,
            experienceLevel: '3',
          }}
          >
      </Form>

      </Content>

    </Layout>
    </div>
  );
};
