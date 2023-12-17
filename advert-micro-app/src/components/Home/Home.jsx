import './Home.css';
import { request } from '../../api/axiosConfig';
import { useState, useEffect } from 'react';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import Advert from '../Advert/Advert';
import AddAdvertForm from '../AdvertForm/AddAdvertForm';
import { useAuth } from '../Contexts/AuthContext';

function Home() {

    const [adverts, setAdverts] = useState([]);
    const [toggleForm, setToggleForm] = useState(false);
    const { isLoggedIn } = useAuth();

    var i = 8;

    const getAdverts = async () => {
        await request("/api/adverts/all", '', "GET")
            .then(function (response) {
                let adverts = response.data;
                setAdverts(adverts);
                console.log(adverts);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getAdverts();
    }, []);

    const deleteAdvert = async (id) => {
        await request("/api/adverts/" + id, '', "DELETE")
            .then(function (response) {
                console.log(response.data);
                getAdverts();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <TopBar adverts={adverts} setAdverts={setAdverts} getAdverts={getAdverts}/>
            <SideBar />
            <section>
                {isLoggedIn && <button className='add_adverts_button' onClick={() => setToggleForm(true)}> + Add advert</button>}
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
