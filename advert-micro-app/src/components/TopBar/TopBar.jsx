import React, { useState } from 'react'
import './TopBar.css'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from '../Dropdown/Dropdown';
import { useAuth } from '../Contexts/AuthContext';
import { request } from '../../api/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function TopBar({ setAdverts }) {

    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [input, setInput] = useState('');

    const filterAdverts = async (value) => {
        await request("/api/adverts/all", '', "GET")
            .then(function (response) {
                let adverts = response.data;
                console.log(response.data);
                if (value !== '') {
                    let filteredAdverts = adverts.filter(advert => advert.title.toLowerCase().includes(value));
                    console.log(filteredAdverts);
                    setAdverts(filteredAdverts);
                } else {
                    setAdverts(adverts);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleOnChange = (value) => {
        setInput(value);
        filterAdverts(value);
    }

    return (
        <div className='TopBar'>
            <div className="search">
                <input placeholder='Search' type="text" value={input} onChange={(event) => handleOnChange(event.target.value)}></input>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-btn' />
            </div>
            {!isLoggedIn && <button className="signIn-btn" onClick={() => navigate("/login", { state: { action: "Login" } })}>Login</button>}
            {!isLoggedIn && <button className="register-btn" onClick={() => navigate("/login", { state: { action: "Sign up" } })}>Sign up</button>}
            {isLoggedIn && <Dropdown />}
        </div>
    )
}

export default TopBar