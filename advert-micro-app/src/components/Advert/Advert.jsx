import React from 'react'
import './Advert.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import AddAdvertForm from '../../components/AdvertForm/AddAdvertForm';
import AdvertDetailsDrawer from '../AdvertDetailsDrawer/AdvertDetailsDrawer';

function Advert( {advert, imageSource, deleteAdvert, getAdverts} ) {

  const [toggleForm, setToggleForm] = useState(false);
  const [displayAdvertDrawer, setDisplayAdvertDrawer] = useState(false);

  const handleEditOnClick = (e) => {
    e.stopPropagation();
    setToggleForm(true);
  }

  const handleDetailsOnClick = (e) => {
      setDisplayAdvertDrawer(true)
  }

  const handleDeleteAdvert = (e) => {
    e.stopPropagation()
    deleteAdvert(advert.id)
  }
  
  return (
    <div className='advert-container' key={advert.id} id='DIV' onClick={(event) => handleDetailsOnClick(event)}>
        <img className='advert-image' src={imageSource} alt=''></img>
        <p className='advert-user'>pjoz</p>
        <h1 className='advert-title'>{advert.title}</h1>
        <span className='advert-price'>{advert.price}</span>
        <FontAwesomeIcon icon={faPenToSquare} onClick={(event) => {handleEditOnClick(event)}} className='advert-btn-edit'/>
        <FontAwesomeIcon icon={faTrash} onClick={(e) => handleDeleteAdvert(e)} className='advert-btn-delete'/>
        <AddAdvertForm toggleForm={toggleForm} setToggleForm={setToggleForm} advert={advert} isEdit={true} getAdverts={getAdverts}/>
        <AdvertDetailsDrawer displayAdvertDrawer={displayAdvertDrawer} setDisplayAdvertDrawer={setDisplayAdvertDrawer} advert={advert}/>
    </div>
  )
}

export default Advert