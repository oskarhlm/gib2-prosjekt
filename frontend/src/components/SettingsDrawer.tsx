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
import Api from 'helper/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/store';
import { updateSettings } from 'ducks/drivingDistanceSlice';
import L from 'leaflet';

export function SettingsDrawer() {
  const [collapsed, setCollapsed] = useState(false);
  const api = new Api();
  const settings = useSelector((state: RootState) => state.drivingDistance);
  type DDSettings = typeof settings;
  const dispatch = useDispatch();

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleSubmit = (values: any) => {
    console.log('Values recieved: ', values);
    dispatch(
      updateSettings({
        startPosition: [10, 63],
        maxMinutes: 5, //values.latestFinishTime,
        maxSlope: values.maxSlope,
        roundTrip: values.roundTrip,
        experience: parseInt(values.experienceLevel),
      } as DDSettings)
    );
    handleCollapsed();
  };

  return (
    <div
      style={{ width: 256, padding: 10, zIndex: 1000, position: 'absolute' }}
    >
      <Button
        type="default"
        onClick={handleCollapsed}
        style={{ marginBottom: 16 }}
      >
        <MenuOutlined />
      </Button>
      <Drawer
        title="Innstillinger for tur"
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
          <Form.Item name="experienceLevel" label="Erfaringsnivå">
            <Radio.Group>
              <Radio.Button value="1">1</Radio.Button>
              <Radio.Button value="2">2</Radio.Button>
              <Radio.Button value="3">3</Radio.Button>
              <Radio.Button value="4">4</Radio.Button>
              <Radio.Button value="5">5</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
            <Button type="primary" htmlType="submit">
              Bruk
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
