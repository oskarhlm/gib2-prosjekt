import { Modal, Button, Form, Input, Select, Checkbox, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/store';
import Api from 'helper/api';
import { setPOI as setPoints } from 'ducks/POISlice';
import { setCategoriesUsed } from 'ducks/categoriesUsedSlice';
import {
  blueMarker,
  goldMarker,
  greenMarker,
  orangeMarker,
  yellowMarker,
  violetMarker,
} from 'assets/icons';

export const CategorySelector = () => {
  const api = new Api();
  const [modelVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    api.fetchPOICategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const showModal = () => {
    setModalVisible(true);
  };

  const iconList = [
    // blueMarker,
    goldMarker,
    greenMarker,
    orangeMarker,
    yellowMarker,
    violetMarker,
  ];

  const onFinish = (values: { categories: string[] }) => {
    console.log(values.categories.slice(0, 5));

    dispatch(setCategoriesUsed(values.categories.slice(0, 5)));
    dispatch(setPoints([]));

    api.fetchPointsOfInterest(values.categories.slice(0, 5)).then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        data[i].properties.iconNumber = values.categories.indexOf(
          data[i].properties.fclass
        );
      }
      dispatch(setPoints(data));
    });
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Button type={'primary'} onClick={showModal}>
        Velg kategorier
      </Button>
      <Modal
        title="Velg kategorier du vil vise"
        visible={modelVisible}
        onOk={() => form.submit()}
        okText="Lagre"
        onCancel={handleCancel}
        cancelText="Avbryt"
      >
        <p>
          Maks antall kategorier er 5. Velger du flere enn 5, vil disse ikke
          vises.
        </p>

        <Form form={form} onFinish={onFinish}>
          <Form.Item name="categories">
            <Select
              mode="multiple"
              maxTagCount={6}
              maxTagPlaceholder={'For mange kategorier valgt!'}
            >
              {categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
