import { Modal, Button, Form, Input, Select, Checkbox, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/store';
import Api from 'helper/api';

export const UserDestinationButton2 = () => {
  const api = new Api();
  const [modelVisible, setModalVisible] = useState(false);
  const [customCategory, setCustomCategory] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<string[]>([
    'Restaurant',
    'Dagligvare',
    'Annen kulturdetalj',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
  ]);
  const destination = useSelector(
    (state: RootState) => state.locations.destination
  );
  const buttonActive = destination.loc !== null && destination.isNew;

  

  useEffect(() => {
    api.fetchPOICategories(dataene).then((data) => {
      setCategories(data);
    });
  }, []);

  const showModal = () => {
    setModalVisible(true);
  };

  const onFinish = (values: {
    title: string;
    category: string;
    customCategory: string;
  }) => {
    console.log(values);
    destination.loc &&
      api.addPointOfInterest({
        title: values.title,
        category: values.category || values.customCategory,
        geography: [destination.loc.lat, destination.loc.lng],
      });
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleCollapsed = () => {
  };
  const handleSelect = () => {


  };

  return (
    <>
      <Button
        type={buttonActive ? 'primary' : 'ghost'}
        onClick={showModal}
        disabled={!buttonActive}
      >
        Velg kategorier
      </Button>
      <Modal
        title="Velg kategorier du vil vise"
        visible={modelVisible}
        onOk={() => form.submit()}
        okText="Lagre"
        onCancel={handleCancel}
        cancelText="Avbryt"
        // transitionName=""
        // maskTransitionName=""
      >
        <Form form={form} onFinish={onFinish}>

          <Form.Item
            name="category"
            hidden={customCategory}
          >
            <Select mode="multiple"> onSelect={handleSelect}
            {categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>

          </Form.Item>
          <Form.Item
            name="customCategory"
            hidden={!customCategory}
            rules={[
              {
                required: customCategory,
                message: 'Vennligst spesifiser en kategori',
              },
            ]}
          >
            <Input placeholder="Egendefinert kategori" />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};
