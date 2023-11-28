import React from 'react'
import './Advert.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

function Advert( {advert, imageSource, deleteAdvert} ) {

  return (
    <div className='advert-container' key={advert.id}>
        <img className='advert-image' src={imageSource} alt=''></img>
        <p className='advert-user'>pjoz</p>
        <h1 className='advert-title'>{advert.title}</h1>
        <span className='advert-price'>{advert.price}</span>
        <FontAwesomeIcon icon={faPenToSquare} className='advert-btn-edit'/>
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteAdvert(advert.id)}/>
    </div>
  )
}

export default Advert