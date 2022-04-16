import { Modal, Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/store';

export const UserDestinationButton = () => {
  const [modelVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<string[]>([
    'Restaurant',
    'Dagligvare',
    'Annen kulturdetalj',
  ]);
  const destination = useSelector(
    (state: RootState) => state.locations.destination
  );
  const buttonActive = destination !== null;

  const showModal = () => {
    setModalVisible(true);
  };

  const onFinish = (values: any) => {
    console.log(values);
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
        transitionName=""
        maskTransitionName=""
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="title" required={true}>
            <Input placeholder="Tittel" />
          </Form.Item>
          <Form.Item name="category">
            <Select placeholder="Kategori">
              {categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="Beskrivelse" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
