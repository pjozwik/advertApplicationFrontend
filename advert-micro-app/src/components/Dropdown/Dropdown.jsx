import React, { useState } from 'react'
import './Dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import ProfileDetails from '../ProfileDetails/ProfileDetails';

export const Dropdown = ( {setShowCustomerDetails, setShowHomePage} ) => {

    const { logOut, authCustomer } = useAuth();
    const [toggleDropdown, setToggleDropdownn] = useState(false);
    const [showProfileDetails, setShowProfileDetails] = useState(false);
    const navigate = useNavigate();

    const handleOnClick = (e) => {
        setToggleDropdownn((prevState) => {
            return !prevState;
        });
        e.stopPropagation();
    }

    const handleLogOut = (e) => {
        e.stopPropagation();
        e.preventDefault();
        logOut();
        setShowCustomerDetails(false);
        navigate("/")
        setShowHomePage(true)
        localStorage.clear();
    }

    const handleProfileBtnClick = (e) => {
        setShowProfileDetails(true);
        setToggleDropdownn((prevState) => {
            return !prevState;
        });
        e.stopPropagation();
    }

    return (
        <div className='dropdown-container'>
            <div className="dropdown-layout" onClick={(e) => handleOnClick(e)}>
                <img className='dropdown-image' src='https://i.pravatar.cc/100?img=61' alt=''></img>
                <div className="dropdown-text">
                    <h1>{authCustomer !== null ? authCustomer.email : ''}</h1>
                    <p>{ authCustomer !== null ? authCustomer.roles : ''}</p>
                </div>
                <FontAwesomeIcon icon={faCaretDown} className='dropdown-collapse-btn' />
            </div>
            <ul className={toggleDropdown ? 'dropdown-menu open' : 'dropdown-menu'}>
                <li onClick={(e) => handleProfileBtnClick(e)}>
                    <span className='dropdown-menu-item' onClick={(e) => handleProfileBtnClick(e)}>My profile</span>
                </li>
                <li onClick={(e) => {handleLogOut(e)}}>
                    <span className='dropdown-menu-item' onClick={(e) => {handleLogOut(e)}}>Log out</span>
                </li>
            </ul>
            {showProfileDetails && <ProfileDetails showProfileDetails={showProfileDetails} setShowProfileDetails={setShowProfileDetails}/>}
        </div>
    )
}
