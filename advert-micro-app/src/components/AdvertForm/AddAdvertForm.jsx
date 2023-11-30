import React from 'react'
import { Drawer } from "@mui/material"
import './AddAdvertForm.css'
import api from '../../api/axiosConfig';
import {useForm} from 'react-hook-form'

function AddAdvertForm ( {toggleForm, setToggleForm, getAdverts, advert, isEdit}) {

    const {register, handleSubmit, reset, getValues} = useForm({
        defaultValues: {
            title: advert !== undefined ? advert.title : '',
            description: advert !== undefined ? advert.description : '',
            price: advert !== undefined ? advert.price : '',
            contactDetails: advert !== undefined ? advert.contactDetails : ''
        }
    });

    const onSubmit = async (e) => {
        const values = getValues();
        const advertToSave = {
            userId: '1',
            ...values
        }

        if(isEdit){
            await api.put("/api/adverts/" + advert.id, advertToSave)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        } else {
            await api.post("/api/adverts", advertToSave)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        getAdverts();
        setToggleForm(false);
        
    }

    const handleCancel = (e) => {
        if(!isEdit) reset();
        setToggleForm(false);
        e.stopPropagation();
    }

    return (
        <Drawer anchor="right" 
            open={toggleForm} 
            onClose={(e) => handleCancel(e)} 
            onClick={(e) => e.stopPropagation()}
            className='create' 
            PaperProps={{sx: { width: "35%" }}}>
            { !isEdit && <h1>Add advert</h1>}
            { isEdit && <h1>Edit advert</h1>} 
            {<form onSubmit={handleSubmit(onSubmit)}>
                <label>Title</label>
                <input
                    required 
                    type='text' 
                    {...register("title")}>               
                </input>
                <label>Price</label>
                <input 
                    required 
                    type='text' 
                    {...register("price")}>                        
                </input>
                <label>Contact details</label>
                <input 
                    required 
                    type='text' 
                    {...register("contactDetails")}>                       
                </input>
                <label>Description</label>
                <textarea 
                    required 
                    {...register("description")}>                   
                </textarea>
                <button className='add_button'>Save</button>
            </form>}
            <button className='cancel_button' onClick={(e) => handleCancel(e)}>Cancel</button>
        </Drawer>
    )
}

export default AddAdvertForm