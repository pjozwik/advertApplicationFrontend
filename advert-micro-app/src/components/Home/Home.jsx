import './Home.css';
import api from '../../api/axiosConfig';
import { getAuthToken } from '../../api/axiosConfig';
import { useState, useEffect } from 'react';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import Advert from '../Advert/Advert';
import AddAdvertForm from '../AdvertForm/AddAdvertForm';

function Home() {

    const [adverts, setAdverts] = useState([]);
    const [toggleForm, setToggleForm] = useState(false);

    var i = 8;

    const getAdverts = async () => {
        try {      
            const response = await api.get("/api/adverts");
            setAdverts(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAdverts();
    }, []);

    const deleteAdvert = async (id) => {
        await api.delete("/api/adverts/" + id);
        getAdverts();
    }

    const hasToken = () => {
        return (getAuthToken() !== null && getAuthToken() !== 'undefined') ? true : false;
    }

    return (
        <div>
            <TopBar />
            <SideBar />
            <section>
                {hasToken() && <button className='add_adverts_button' onClick={() => setToggleForm(true)}> + Add advert</button>}
                <div className="container">
                    <div className='adverts'>
                        {adverts.length > 0 && adverts?.map(advert => {
                            var imageSource = 'https://i.pravatar.cc/100?img=' + i++;
                            return <Advert advert={advert} imageSource={imageSource} deleteAdvert={deleteAdvert} getAdverts={getAdverts} />
                        })}
                    </div>
                </div>
            </section>
            <AddAdvertForm toggleForm={toggleForm} setToggleForm={setToggleForm} getAdverts={getAdverts} />
        </div>
    );
}

export default Home;
