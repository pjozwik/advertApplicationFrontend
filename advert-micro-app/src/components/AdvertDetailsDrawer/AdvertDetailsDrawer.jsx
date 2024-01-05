import React from 'react'
import { Drawer } from "@mui/material"
import './AdvertDetailsDrawer.css'

function AdvertDetailsDrawer ( {displayAdvertDrawer, setDisplayAdvertDrawer, advert} ) {

    function handleOnClose (e) {
        e.stopPropagation();
        setDisplayAdvertDrawer(false);
    }

    return (
        <Drawer anchor="right" 
            open={displayAdvertDrawer} 
            onClose={(e) => handleOnClose(e)} 
            className='display-advert'
            PaperProps={{sx: { width: "35%" }}}>
              <div className='div-wrapper'>
                <h1>{advert !== undefined ? advert.title : ''}</h1>
                <p className='advert-details'>Posted by: {advert !== undefined ? advert.userName : ''}</p>
                <p className='advert-details'>Price: {advert !== undefined ? advert.price : ''} $</p>
                <textarea>{advert !== undefined ? advert.description : ''}</textarea>
                <label>Contact details:</label>
                <p className='contact-detail'>{advert !== undefined ? advert.contactDetails : ''}</p>
                <div className='footer'>
                    <button className='close-btn' onClick={(e) => handleOnClose(e)}>Close</button>
                    <p className='advert-details'>Posted: {advert !== undefined ? advert.creationDate : ''}</p>
                </div>
              </div>
        </Drawer>
    )
}

export default AdvertDetailsDrawer