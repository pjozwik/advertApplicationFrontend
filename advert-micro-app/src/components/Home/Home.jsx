import './Home.css';
import { request } from '../../api/axiosConfig';
import { useState, useEffect } from 'react';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import Advert from '../Advert/Advert';
import AddAdvertForm from '../AdvertForm/AddAdvertForm';
import { useAuth } from '../Contexts/AuthContext';
import CustomerTable from '../CustomerTable/CustomerTable';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpAZ, faArrowUp19 } from '@fortawesome/free-solid-svg-icons'

function Home() {

    const [adverts, setAdverts] = useState([]);
    const [toggleForm, setToggleForm] = useState(false);
    const { isLoggedIn, authCustomer } = useAuth();
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);
    const [showProfileDetails, setShowProfileDetails] = useState(false);
    const [showHomePage, setShowHomePage] = useState(true);

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

    const sortByPrice = () => {
        const sortedAdverts = [...adverts].sort((a, b) => b.price - a.price);
        setAdverts(sortedAdverts);
    }

    const sortAlphabeticallyByTitle = () => {
        const sortedAdverts = [...adverts].sort((a, b) => a.title > b.title ? 1 : -1,);
        setAdverts(sortedAdverts);
    }

    return (
        <div>
            <TopBar setAdverts={setAdverts} getAdverts={getAdverts} setShowCustomerDetails={setShowCustomerDetails} setShowHomePage={setShowHomePage} />
            <SideBar setShowCustomerDetails={setShowCustomerDetails} setShowProfileDetails={setShowProfileDetails} setShowHomePage={setShowHomePage} />
            <section>
                {showHomePage && isLoggedIn && <button className='add_adverts_button' onClick={() => setToggleForm(true)}> + Add advert</button>}
                {showHomePage && <div className="container">
                    <div className='adverts'>
                        {adverts.length > 0 && adverts?.map(advert => {
                            var imageSource = 'https://i.pravatar.cc/100?img=' + i++;
                            return <Advert advert={advert} imageSource={imageSource} deleteAdvert={deleteAdvert} getAdverts={getAdverts} />
                        })}
                    </div>
                </div>}
                {showCustomerDetails && <CustomerTable />}
                {showHomePage &&
                    <button className='sort-title-btn' onClick={() => sortAlphabeticallyByTitle()}>
                        <FontAwesomeIcon className='sort-title' icon={faArrowUpAZ} size='lg' />
                        Sort by title
                    </button>}
                {showHomePage && <button className='sort-price-btn' onClick={() => sortByPrice()}>
                    <FontAwesomeIcon className='sort-price' icon={faArrowUp19} size='lg' />
                    Sort by price
                </button>}
            </section>
            <AddAdvertForm toggleForm={toggleForm} setToggleForm={setToggleForm} getAdverts={getAdverts} />
            {showProfileDetails && <ProfileDetails showProfileDetails={showProfileDetails} setShowProfileDetails={setShowProfileDetails} authCustomer={authCustomer} />}
        </div>
    );
}

export default Home;
