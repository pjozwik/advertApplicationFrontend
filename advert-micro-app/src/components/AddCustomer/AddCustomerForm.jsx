import React from 'react'
import { Drawer } from "@mui/material"
import './AddCustomerForm.css'
import { request } from '../../api/axiosConfig';
import { useForm } from 'react-hook-form'

const AddCustomerForm = ({ displayUsertDrawer, setDisplayUserDrawer, user, getUsers }) => {

    const { register, handleSubmit, reset, getValues } = useForm({
        defaultValues: {
            name: user !== undefined ? user.name : '',
            surname: user !== undefined ? user.surname : '',
            userName: user !== undefined ? user.userName : '',
            email: user !== undefined ? user.email : '',
            roles: user !== undefined ? user.roles : ''
        },
    });

    const onSubmit = async (e) => {
        const values = getValues();
        const userToSave = {
            ...values
        }

        await request("/api/users/" + user.id, userToSave, "PUT")
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        getUsers();
        setDisplayUserDrawer(false);
    }

    const handleCancel = (e) => {
        reset();
        setDisplayUserDrawer(false);
        e.stopPropagation();
    }

    return (
        <Drawer anchor="right"
            open={displayUsertDrawer}
            onClose={(e) => handleCancel(e)}
            onClick={(e) => e.stopPropagation()}
            className='create'
            PaperProps={{ sx: { width: "35%" } }}>
             <h1>Edit user</h1>
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
                    {...register("roles")}>
                </input>
                <button className='add_button'>Save</button>
            </form>}
            <button className='cancel_button' onClick={(e) => handleCancel(e)}>Cancel</button>
        </Drawer>
    )
}

export default AddCustomerForm