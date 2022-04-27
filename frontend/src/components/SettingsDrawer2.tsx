import { useState } from 'react';
import {
  Button,
  Drawer,
  Slider,
  Form,
  Radio,
  Checkbox,
  TimePicker,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/store';
import {
  updateSettings,
  DrivingDistanceState,
} from 'ducks/drivingDistanceSlice';

import Api from 'helper/api';
import { useEffect} from 'react';
import { Marker, Popup } from 'react-leaflet';
import { defaultIcon } from 'assets/icons';
import L from 'leaflet';
import { setDestination } from 'ducks/locationsSlice';
import { setPOI as setPoints } from 'ducks/POISlice';


export const SettingsDrawer2 = () => {
    const api = new Api();
  const [collapsed, setCollapsed] = useState(false);
  const settings = useSelector((state: RootState) => state.drivingDistance);
  const dispatch = useDispatch();

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    api.fetchPointsOfInterest([]).then((data) => {
      dispatch(setPoints(data));
    });
  }, []);
  const kategorier=api.fetchPOICategories();


  const handleSubmit = (values: any) => {
    dispatch(
      updateSettings({
        startPosition: [10, 63],
        maxMinutes: moment
          .duration(values.latestFinishTime.diff(moment()))
          .asMinutes(),
        maxSlope: values.maxSlope,
        roundTrip: values.roundTrip,
        experience: parseInt(values.experienceLevel),
      } as DrivingDistanceState)
    );
    handleCollapsed();
  };

  return (
    <div>
      <Button type="default" onClick={handleCollapsed}>
        <MenuOutlined />
      </Button>
      <Drawer
        title="Kategorier"
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
            latestFinishTime: moment().add(5, 'm'),
            maxSlope: 30,
            experienceLevel: '3',
          }}
          >
          <Form.Item name="roundTrip" valuePropName="checked">
            <Checkbox>Tur/retur</Checkbox>
          </Form.Item>
          <Form.Item name="latestFinishTime" label="Tur ferdig innen">
            <TimePicker showNow={false} />
          </Form.Item>
          <Form.Item name="maxSlope" label="Maks helning (%)">
            <Slider max={30} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
            <Button type="primary" htmlType="submit">
                {api.fetchPointsOfInterest([])}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
