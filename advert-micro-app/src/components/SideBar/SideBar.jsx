import React from 'react'
import './SideBar.css'
import logo from '../Assets/logo.svg'

function SideBar () {

    return (
        <div className='SideBar'>
            <img width={70} height={70} className='logo' src={logo} alt="" />
        </div>
    )
}

export default SideBar