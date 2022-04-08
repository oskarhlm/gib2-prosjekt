/*testing changes to SettingsDrawer */

import { useState } from 'react';
import {
  Button,
  Drawer,
  Slider,
  Form,
  Radio,
  Checkbox,
  TimePicker,
  Cascader,
  Input,
  Select,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';


export function AddLocationDrawer2(asdf: boolean) {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapsed = () => {
    //setCollapsed(!collapsed);
    asdf=(!asdf)
  };

  const handleSubmit = (values: any) => {
    console.log('Values recieved: ', values);
    handleCollapsed(); /* collapses if open. If open, collapses*/
  };

const options = [
  {
    value: 'Idrettsanlegg',
    label: 'Idrettsanlegg',
    children: [
      {
        value: 'Fotballbane',
        label: 'Fotballbane',
        children: [
          {
            value: 'xihuaaaaaaaaaa',
            label: 'West Lakeaaaaaaaaaaa',
          },
        ],
      },
    ],
  },
  {
    value: 'Kulturminneaaaaaa',
    label: 'Kulturminneaaaaaa',
    children: [],
  },
];
  function handleChange() {
    console.log(`handlechange`);
  }

  return (
    <div
      style={{ width: 400, padding: 10, zIndex: 1000, position: 'relative' }}
    >
      <Drawer
        title="Legg til lokasjon"
        placement={'left'}
        closable={true}
        onClose={handleCollapsed}
        visible={asdf}
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
    </div>
  );
      }