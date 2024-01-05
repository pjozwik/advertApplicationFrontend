import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import './CustomerTable.css';
import AdvertDetailsDrawer from '../AdvertDetailsDrawer/AdvertDetailsDrawer';
import AddAdvertForm from '../AdvertForm/AddAdvertForm';

const CustomerAdvertsRow = ({ advert, deleteAdvert, getAdverts }) => {

    const [displayAdvertDrawer, setDisplayAdvertDrawer] = useState(false);
    const [toggleForm, setToggleForm] = useState(false);
  
    const handleEditOnClick = (e) => {
      e.stopPropagation();
      setToggleForm(true);
    }

    return (
        <tr onClick={() => setDisplayAdvertDrawer(true)}>
            <td colSpan={6} className='td-colspan'><b>Advert title:</b> {advert.title}</td>
            <td className='td-button'>
                <FontAwesomeIcon icon={faPenToSquare} size='xs' className='edit-advert-btn' onClick={(event) => { handleEditOnClick(event)}}/>
                <FontAwesomeIcon icon={faTrash} size='xs' className='delete-advert-btn' onClick={() => deleteAdvert(advert.id)}/>
            </td>
            <AdvertDetailsDrawer displayAdvertDrawer={displayAdvertDrawer} setDisplayAdvertDrawer={setDisplayAdvertDrawer} advert={advert} />
            <AddAdvertForm toggleForm={toggleForm} setToggleForm={setToggleForm} advert={advert} isEdit={true} getAdverts={getAdverts}/>
        </tr>
    )
}

export default CustomerAdvertsRow