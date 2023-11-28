import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Advert from './components/Advert/Advert';
import TopBar from './components/TopBar/TopBar';
import SideBar from './components/SideBar/SideBar';
import AddAdvertForm from './components/AdvertForm/AddAdvertForm';

function App() {

const [adverts, setAdverts] = useState([]);
const [toggleForm, setToggleForm] = useState(false);

var i = 8;

const getAdverts = async () => {
  try {
    const response = await api.get("/api/adverts");
    setAdverts(response.data);
    console.log(response.data);
  } catch(err) {
    console.log(err);
  }
}

useEffect(() => {
  getAdverts();
}, []);

const deleteAdvert = async (id) => {
  await api.delete("/api/adverts/"+id);
  getAdverts();
}

  return (
    <div>
    <TopBar />
    <SideBar />
    <section>
      <button className='add_adverts_button' onClick={() => setToggleForm(true)}> + Add advert</button>
      <div className="container">
        <div className='adverts'>
          {adverts?.map(advert => {
            var imageSource = 'https://i.pravatar.cc/100?img=' + i++;
            return <Advert advert={advert} imageSource={imageSource} deleteAdvert={deleteAdvert}/>
          })}
        </div>
      </div>
    </section>
    <AddAdvertForm toggleForm={toggleForm} setToggleForm={setToggleForm} getAdverts={getAdverts}/>
    </div>
  );
}

export default App;
