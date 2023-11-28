import React, { useState } from 'react'
import { Drawer } from "@mui/material"
import './AddAdvertForm.css'
import api from '../../api/axiosConfig';

function AddAdvertForm ( {toggleForm, setToggleForm, getAdverts}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [contactDetails, setContactDetails] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const advert = {
            userId: '1',
            title,
            description,
            price,
            contactDetails
        }
        await api.post("/api/adverts", advert)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
        getAdverts();
        clearInput();
        setToggleForm(false);
    }

    const clearInput = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setContactDetails('');
    }

    const handleCancel = () => {
        clearInput();
        setToggleForm(false);
    }

    return (
        <Drawer anchor="right" 
            open={toggleForm} 
            onClose={() => setToggleForm(false)} 
            className='create' 
            PaperProps={{sx: { width: "25%" }, justifyContent: "center"}}>
            <h1>Add advert</h1>
            {<form onSubmit={handleSubmit}>
                <label>Title</label>
                <input required type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <label>Description</label>
                <textarea required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <label>Price</label>
                <input required type='text' value={price} onChange={(e) => setPrice(e.target.value)}></input>
                <label>Contact details</label>
                <input required type='text' value={contactDetails} onChange={(e) => setContactDetails(e.target.value)}></input>
                <button className='add_button'>Add</button>
            </form>}
            <button className='cancel_button' onClick={() => handleCancel()}>Cancel</button>
        </Drawer>
    )
}

export default AddAdvertForm