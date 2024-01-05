import React, { useEffect, useState } from 'react'
import { request } from '../../api/axiosConfig';
import CustomerTableBody from './CustomerTableBody';

const CustomerTable = () => {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        await request("/api/users/all", '', "GET")
            .then(function (response) {
                let users = response.data;
                setUsers(users);
                console.log(users);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = async (id) => {
        await request("/api/users/" + id, '', "DELETE")
          .then(function (response) {
            console.log(response.data);
            deleteAdverts(id);
            getUsers();
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      const deleteAdverts = async (id) => {
        await request("/api/adverts/user/" + id, '', "DELETE")
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    return (
        <div className='table-container'>
            <table>
                <thead>
                    <td></td>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <td className='td-button'></td>
                </thead>
                {users.length > 0 && users?.map(user => {
                    return <CustomerTableBody user={user} deleteUser={deleteUser} getUsers={getUsers}/>
                })}
            </table>
          </div>
    )
}

export default CustomerTable