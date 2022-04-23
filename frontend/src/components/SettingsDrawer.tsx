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

export const SettingsForm = ({
  showPolygon,
  setShowPolygon,
}: {
  showPolygon: boolean;
  setShowPolygon: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const settings = useSelector((state: RootState) => state.drivingDistance);
  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    setShowPolygon(true);
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
  };

  const handleRemovePolygon = () => {
    setShowPolygon(false);
  };

  return (
    <Form
      onFinish={handleSubmit}
      initialValues={{
        roundTrip: false,
        latestFinishTime: moment().add(5, 'm'),
        maxSlope: 30,
        experienceLevel: '3',
      }}
    >
      <Form.Item name="latestFinishTime" label="Tur ferdig innen">
        <TimePicker showNow={false} />
      </Form.Item>
      <Form.Item name="roundTrip" valuePropName="checked">
        <Checkbox>Tur-retur</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 30, offset: 0 }}>
        <Button type="primary" htmlType="submit">
          Bruk
        </Button>
        {showPolygon && (
          <Button
            style={{ marginLeft: 10 }}
            danger
            onClick={handleRemovePolygon}
          >
            Fjern turradius
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export const SettingsDrawer = () => {
  const [collapsed, setCollapsed] = useState(false);
  const settings = useSelector((state: RootState) => state.drivingDistance);
  const dispatch = useDispatch();

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
        title="Innstillinger for tur"
        placement={'left'}
        closable={true}
        onClose={handleCollapsed}
        visible={collapsed}
        key={1}
      ></Drawer>
    </div>
  );
};
