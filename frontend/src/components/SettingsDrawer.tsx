import { useState } from 'react';
import { Button, Drawer, Slider, Form } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

export function SettingsDrawer() {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleSubmit = () => {
    console.log('Success');
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
        title="Innstillinger"
        placement={'left'}
        closable={true}
        onClose={handleCollapsed}
        visible={collapsed}
        key={1}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item label="Maks radius (km)">
            <Slider max={5} step={0.1} />
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
