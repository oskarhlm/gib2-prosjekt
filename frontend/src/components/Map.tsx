import {
  LayerGroup,
  MapContainer,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import { SettingsForm } from './Settings';
import { POIMarker } from './POIMarker';
import { DrivingDistancePolygon } from './DrivingDistancePolygon';
import { Path } from './Path';
import { Locate } from './Locate';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/store';
import { ButtonRow } from './ButtonRow';
import { UserDestinationButton } from './UserDestination';
import HeightLineChart from './HeightLineChart';
import { CategorySelector } from 'components/CategorySelector';
import { CategoryList } from 'components/CategoryList';

export const Map = () => {
  const location = useSelector(
    (state: RootState) => state.locations.userLocation
  );

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
            <CategorySelector />
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
          <SettingsForm />
        </div>
      </div>
      <MapContainer center={[63.4346, 10.3985]} zoom={13} zoomControl={false}>
        <CategoryList />
        <HeightLineChart />
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
    </div>
  );
};
