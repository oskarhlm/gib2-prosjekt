import { Modal, Button, Form, Input, Select, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/store';
import Api from 'helper/api';

export const UserDestinationButton = () => {
  const api = new Api();
  const [modelVisible, setModalVisible] = useState(false);
  const [customCategory, setCustomCategory] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<string[]>([
    'Restaurant',
    'Dagligvare',
    'Annen kulturdetalj',
  ]);
  const destination = useSelector(
    (state: RootState) => state.locations.destination
  );
  const buttonActive = destination.loc !== null && destination.isNew;

  useEffect(() => {
    api.fetchPOICategories().then((data) => {
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

  return (
    <>
      <Button
        type={buttonActive ? 'primary' : 'ghost'}
        onClick={showModal}
        disabled={!buttonActive}
      >
        Lagre destinasjon
      </Button>
      <Modal
        title="Legg til destinasjon"
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
            name="title"
            rules={[{ required: true, message: 'Vennligst angi et stednavn' }]}
          >
            <Input placeholder="Stedsnavn" />
          </Form.Item>
          <Form.Item
            name="category"
            hidden={customCategory}
            rules={[
              {
                required: !customCategory,
                message: 'Vennligst spesifiser en kategori',
              },
            ]}
          >
            <Select placeholder="Kategori">
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
          <Form.Item>
            <Checkbox onClick={() => setCustomCategory(!customCategory)}>
              Legg til kategori
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
