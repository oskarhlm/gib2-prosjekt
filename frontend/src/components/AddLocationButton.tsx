import { Button} from 'antd';
import{PlusOutlined} from '@ant-design/icons';



export function AddLocationButton(){

/*
      newLocationMode(){
            <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={newLocationMode()}>
            </Button>
      }
*/
      return(
      <div>
      <Button type="primary" shape="circle" icon={<PlusOutlined />} /*onClick={newLocationMode()}*/>
      </Button>
      </div>
      
      )
}
