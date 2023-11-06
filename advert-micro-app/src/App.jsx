import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Advert from './components/Advert/Advert';

function App() {

const [adverts, setAdverts] = useState([]);
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
  const response = await api.delete("/api/adverts/"+id);
  getAdverts();
}

  return (
    <div>
    <section>
      <div className="container">
        <div className='adverts'>
          {adverts?.map(advert => {
            var imageSource = 'https://i.pravatar.cc/100?img=' + i++;
            return <Advert advert={advert} imageSource={imageSource} deleteAdvert={deleteAdvert}/>
          })}
        </div>
      </div>
    </section>
    </div>
  );
}

export default App;
