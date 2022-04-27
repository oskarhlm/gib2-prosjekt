import { Modal, Button, Form, Input, Select, Checkbox, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/store';
import Api from 'helper/api';
import { setPOI as setPoints } from 'ducks/POISlice';
import {blueMarker,goldMarker,greenMarker,orangeMarker,yellowMarker,violetMarker} from 'assets/icons';

export const UserDestinationButton2 = () => {
  const api = new Api();
  const [modelVisible, setModalVisible] = useState(false);
  const [customCategory, setCustomCategory] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>([//hent fra database
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

  useEffect(() => {//tar inn dataene
    api.fetchPOICategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const showModal = () => {
    setModalVisible(true);
  };
  const iconlist=[blueMarker,goldMarker,greenMarker,orangeMarker,yellowMarker,violetMarker]
  //var dict={value1=[],value2=[],value3=[],value4=[],value5=[],value6=[]}
  var dict: string[][]=[[],[],[],[],[],[]]//dette brukes til å holde styr på om vi allerede har en farge for de ulike kategoriene. Hvis vi f.eks har 3 elementer i dict, får disse farger iconList[1],iconList[2],iconList[3].
  //regner med dict heller bør være en del av state. 
  const onFinish = (values: {
    categories: string[]
  }) => {
    console.log(values.categories.slice(0,7));
    api.fetchPointsOfInterest(categories.slice(0, 7)).then((data) => {//gir alle de første 6 markers en icon fra iconList
      console.log(data.length)
      for (let i = 0; i < data.length; i++){
        console.log("11111111")
        let continuing=1
        for (let j = 0; j < dict.length; j++) {
          console.log("2222222222")
          if (continuing===1){
            if (!(dict[j])){
              data[i].properties.icon =iconlist[i]//usikker på denne.
              dict[j].push("1")
              continuing=0
            }
          }
        }
      }
      console.log("dataene:"+data)
      dispatch(setPoints(data));
    })
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
        Velg kategorier
      </Button>
      <Modal
        title="Velg kategorier du vil vise"
        visible={modelVisible}
        onOk={() => form.submit()}
        okText="Lagre"
        onCancel={handleCancel}
        cancelText="Avbryt"
        //kommentarer under: ikke i bruk
        // transitionName=""
        // maskTransitionName=""
        //onSelect={handleSelect()}
        //onSelect={handleSelect()}//handleselect(this option) of this node //dette skal lenger nede i koden.
      >
          <p>Maks antall kategorier er 6. Velger du flere enn 6, vil disse ikke vises.</p>
          
        <Form form={form} onFinish={onFinish}>

          <Form.Item
            name="categories"
          >
            <Select mode="multiple" maxTagCount={6} maxTagPlaceholder={"For mange kategorier valgt!"}> 
            {categories.map((category) => (
                <Select.Option key={category} value={category} >
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
