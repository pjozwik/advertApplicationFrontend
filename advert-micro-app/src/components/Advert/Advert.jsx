import React from 'react'
import './Advert.css'

function Advert( {advert, imageSource, deleteAdvert} ) {

  return (
    <div className='advert-container' key={advert.id}>
        <img className='advert-image' src={imageSource} alt=''></img>
        <p className='advert-user'>pjoz</p>
        <h1 className='advert-title'>{advert.title}</h1>
        <span className='advert-price'>{advert.price}</span>
        <button onClick={() => deleteAdvert(advert.id)} className='advert-btn'>Delete</button>

    </div>
  )
}

export default Advert