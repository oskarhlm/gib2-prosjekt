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
import { Button, Drawer, Form, Input, Select } from 'antd';
import { MenuOutlined } from '@ant-design/icons';


import { DraggableMarker } from './DraggableMarker';
import { AddLocationButton } from './AddLocationButton';
import {AddLocationDrawer2} from './AddLocationDrawer2';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';




export const Map = () => {
  const [staten, setStaten] = useState(false);

  function handleChange() {
    console.log(`handlechange`);
  }
  

  const [collapsed, setCollapsed] = useState(true);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
    //asdf=(!asdf)
  };

  const handleSubmit = (values: any) => {
    console.log('Values recieved: ', values);
    handleCollapsed(); /* collapses if open. If open, collapses*/
  };

  const settings = useSelector((state: RootState) => state.drivingDistance);
  const location = useSelector((state: RootState) => state.location);
  
  let [addLocationMode] = useState(false);
  //let [showingTheAddLocation]=useState();
  let showingTheAddLocation= <h1>aaaaaaaaaa</h1>;

  const handleStaten = () => {
    setStaten(!staten);
  };

  const onClickButton = () => {
    handleStaten();
    console.log(staten);
    addLocationMode=(!addLocationMode);
    
    if(addLocationMode){
      console.log("asdfggg");
      //showingTheAddLocation=<AddLocationDrawer2 />;
    }
  };


          //<AddLocationDrawer2 />

  return (
    
    <div>
      <ButtonRow>
        <SettingsDrawer />
        <Button onClick={() => alert('yo mama')}>Press me</Button>
        <Button onClick={() => setStaten(true)}>Press me!!</Button>
        <Button style={{ backgroundColor: 'coral', color: 'white' }}>
          Lagre destinasjon
        </Button>
        <AddLocationButton />
        {console.log(staten)}

        <Button onClick={() => handleCollapsed()}>Press me!!!!!!!!!!</Button>

        <Drawer
        title="Legg til lokasjon"
        placement={'left'}
        closable={true}
        onClose={handleCollapsed}
        visible={collapsed}
        key={1}
      >
        <Form
          onFinish={handleSubmit}
          initialValues={{
            roundTrip: false,
            latestFinishTime: moment().add(2, 'h'),
            maxRadius: 2,
            maxSlope: 30,
            experienceLevel: '3',
          }}
        >
          <p>Plassering</p>

          {/*
          <Form.Item name="roundTripa" label="asdfg">
            <Cascader> options={options} </Cascader>
          </Form.Item>
        */}

          
          <Select defaultValue="Type" style={{ width: 120 }} onChange={handleChange}>
            <option value="kulturminne">Kulturminne</option>
            <option value="fotballbane">Fotballbane</option>
            <option value="matbutikk" disabled>
              Matbutikk
            </option>
            <option value="turistattraksjon">Turistattraksjon</option>
          </Select>

          <br></br><br />

          <Form.Item label="Beskrivelse" required tooltip="This is a required field">
            <Input placeholder="Beskrivelse" />
          </Form.Item>

          <p>Beskrivelse</p>
          <>
          <TextArea rows={4} />
          <br />
          <br />
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
          </>
          <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
            <Button type="primary" htmlType="submit">
              Bruk
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      </ButtonRow>
      <MapContainer center={[63.4346, 10.3985]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <DrivingDistancePolygon />
        <AttractionMarker />
        <DraggableMarker />
        {location && <Path loc={L.latLng(location)} />}
        <Locate />
      </MapContainer>
    </div>
  );
};
