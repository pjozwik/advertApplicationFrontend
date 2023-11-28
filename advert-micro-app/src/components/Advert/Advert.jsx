import React from 'react'
import './Advert.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import AddAdvertForm from '../../components/AdvertForm/AddAdvertForm';

function Advert( {advert, imageSource, deleteAdvert, getAdverts} ) {

  const [toggleForm, setToggleForm] = useState(false);

  return (
    <div className='advert-container' key={advert.id} onClick={() => console.log("ez")}>
        <img className='advert-image' src={imageSource} alt=''></img>
        <p className='advert-user'>pjoz</p>
        <h1 className='advert-title'>{advert.title}</h1>
        <span className='advert-price'>{advert.price}</span>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => setToggleForm(true)} className='advert-btn-edit'/>
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteAdvert(advert.id)} className='advert-btn-delete'/>
        <AddAdvertForm toggleForm={toggleForm} setToggleForm={setToggleForm} advert={advert} isEdit={true} getAdverts={getAdverts}/>
    </div>
  )
}

export default Advert