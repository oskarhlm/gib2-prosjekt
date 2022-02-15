import 'leaflet/dist/leaflet.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Map } from './components/Map';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
