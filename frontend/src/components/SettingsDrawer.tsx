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

export function SettingsDrawer() {
  const [collapsed, setCollapsed] = useState(false);
  const api = new Api();

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleSubmit = (values: any) => {
    // console.log('Values recieved: ', values);
    api.fetchAttractions().then((res) => console.log(res));
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
            maxRadius: 2,
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
          <Form.Item name="maxRadius" label="Maks radius (km)">
            <Slider max={10} step={0.1} />
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
