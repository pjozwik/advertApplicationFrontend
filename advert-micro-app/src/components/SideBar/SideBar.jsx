import React from 'react'
import './SideBar.css'
import logo from '../Assets/logo.svg'
import { useAuth } from '../Contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faIdCard } from '@fortawesome/free-solid-svg-icons'

function SideBar({ setShowCustomerDetails, setShowProfileDetails, setShowHomePage }) {

    const { isLoggedIn, authCustomer } = useAuth();

    const handleHomeClick = () => {
        setShowCustomerDetails(false);
        setShowProfileDetails(false);
        setShowHomePage(true);
    }

    const handleProfileClick = () => {
        setShowProfileDetails(true);
    }

    const handleCustomersClick = () => {
        setShowHomePage(false);
        setShowProfileDetails(false);
        setShowCustomerDetails(true);
    }

    return (
        <div className='SideBar'>
            <img width={70} height={70} className='logo' src={logo} alt="" />
            <button onClick={() => handleHomeClick()}>
                <FontAwesomeIcon size='xs' className='icons' icon={faHouse} />
                Home</button>
            {isLoggedIn && <button onClick={() => handleProfileClick()}>
                <FontAwesomeIcon size='xs' className='icons' icon={faIdCard} />
                Profile</button>}
            {isLoggedIn && authCustomer?.roles === 'ADMIN' && <button onClick={() => handleCustomersClick()}>
                <FontAwesomeIcon size='xs' className='admin-icon' icon={faUser} />
                Customers</button>}
        </div>
    )
}

export default SideBar