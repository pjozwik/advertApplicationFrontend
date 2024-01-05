import React, { useEffect } from 'react'
import './ProfileDetails.css'
import { Drawer } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useAuth } from '../Contexts/AuthContext';
import { request } from '../../api/axiosConfig';

const ProfileDetails = ({ showProfileDetails, setShowProfileDetails}) => {

    const {authCustomer, getCustomerFromToken} = useAuth();

    const { register, handleSubmit, reset, getValues } = useForm({
        defaultValues: {
            name: authCustomer !== null ? authCustomer.name : '',
            surname: authCustomer !== null ? authCustomer.surname : '',
            userName: authCustomer !== null ? authCustomer.userName : '',
            email: authCustomer !== null ? authCustomer.email : '',
            roles: authCustomer !== null ? authCustomer.roles : ''
        },
    });

    useEffect(() => {
        reset();
    }, [authCustomer])

    const onSubmit = async (e) => {
        const values = getValues();
        const userToSave = {
            ...values
        }

        await request("/api/users/" + authCustomer.userId, userToSave, "PUT")
            .then(function (response) {
                console.log(response);
                getCustomerFromToken();
            })
            .catch(function (error) {
                console.log(error);
            });

        setShowProfileDetails(false);
    }

    const handleCancel = (e) => {
        reset();
        setShowProfileDetails(false);
        e.stopPropagation();
    }


    return (
        <Drawer anchor="right"
            open={showProfileDetails}
            onClose={(e) => handleCancel(e)}
            onClick={(e) => e.stopPropagation()}
            className='create'
            PaperProps={{ sx: { width: "35%" } }}>
            <h1>Profile</h1>
            {<form onSubmit={handleSubmit(onSubmit)}>
                <label>Name</label>
                <input
                    required
                    type='text'
                    {...register("name")}>
                </input>
                <label>Surname</label>
                <input
                    required
                    type='text'
                    {...register("surname")}>
                </input>
                <label>Username</label>
                <input
                    required
                    type='text'
                    {...register("userName")}>
                </input>
                <label>Email</label>
                <input
                    required
                    type='email'
                    {...register("email")}>
                </input>
                <label>Role</label>
                <input
                    required
                    type='text'
                    {...register("roles")}
                    disabled={true}>
                </input>
                <button className='add_button'>Save</button>
            </form>}
            <button className='cancel_button' onClick={(e) => handleCancel(e)}>Cancel</button>
        </Drawer>
    )
}

export default ProfileDetails