import { Button, Form, Checkbox, TimePicker } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/store';
import {
  updateSettings,
  PolygonState,
  setShowPolygon,
} from 'ducks/polygonSlice';

export const SettingsForm = () => {
  const polygonState = useSelector((state: RootState) => state.polygon);
  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    dispatch(setShowPolygon(true));
    dispatch(
      updateSettings({
        startPosition: [10, 63],
        maxMinutes: moment
          .duration(values.latestFinishTime.diff(moment()))
          .asMinutes(),
        maxSlope: values.maxSlope,
        roundTrip: values.roundTrip,
        experience: parseInt(values.experienceLevel),
      } as PolygonState['settings'])
    );
  };

  const handleRemovePolygon = () => {
    dispatch(setShowPolygon(false));
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
      <Form.Item
        name="latestFinishTime"
        label="Tur ferdig innen"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value.diff(moment()) > 0) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Tidsreise er ikke oppfunnet enda...')
              );
            },
          }),
        ]}
      >
        <TimePicker showNow={false} />
      </Form.Item>
      <Form.Item name="roundTrip" valuePropName="checked">
        <Checkbox>Tur-retur</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 30, offset: 0 }}>
        <Button type="primary" htmlType="submit">
          Bruk
        </Button>
        {polygonState.showPolygon && polygonState.polygon && (
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
