import React, { useEffect, useState } from 'react'
import CustomerAdvertsRow from './CustomerAdvertsRow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import './CustomerTable.css';
import { request } from '../../api/axiosConfig';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import AddCustomerForm from '../AddCustomer/AddCustomerForm';

const CustomerTableBody = ({ user, deleteUser, getUsers }) => {

  const [isExpanded, setIsExpanded] = useState(false)
  const [adverts, setAdverts] = useState([]);
  const [displayUsertDrawer, setDisplayUserDrawer] = useState(false);

  const getAdverts = async () => {
    await request("/api/adverts/users/" + user.id, '', "GET")
      .then(function (response) {
        let adverts = response.data;
        setAdverts(adverts);
        console.log(adverts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getAdverts();
  }, []);

  const deleteAdvert = async (id) => {
    await request("/api/adverts/" + id, '', "DELETE")
      .then(function (response) {
        console.log(response.data);
        getAdverts();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleOnClick = () => {
    setIsExpanded(prevState => {
      return !prevState
    })
    console.log(isExpanded)
  }

  const handleOnTrashClick = (e) => {
    e.stopPropagation();
    deleteUser(user.id);
  }

  const handleOnEditClick = (e) => {
    e.stopPropagation();
    setDisplayUserDrawer(true);
  }

  const applyStyle = () => {
    if (adverts === undefined || adverts.length === 0) {
      return 'fa-disabled'
    } else if (isExpanded === true) {
      return 'fa-rotate-180'
    } else {
      return 'fa-rotate-0'
    }
  }

  return (
    <tbody>
      <tr onClick={() => handleOnClick()}>
        <FontAwesomeIcon className={applyStyle()}
          icon={faCaretDown}
          rotation={0}
          size='lg' 
          />
        <td>{user.name}</td>  
        <td>{user.surname}</td>
        <td>{user.userName}</td>
        <td>{user.email}</td>
        <td>{user.roles}</td>
        <td className='td-button'>
          <FontAwesomeIcon icon={faPenToSquare} size='xs' className='edit-advert-btn' onClick={(e) => handleOnEditClick(e)}/>
          <FontAwesomeIcon icon={faTrash} size='xs' onClick={(e) => handleOnTrashClick(e)} className='delete-advert-btn'/>
        </td>
      </tr>
      {isExpanded && adverts.length > 0 && adverts?.map(advert => {
        return <CustomerAdvertsRow advert={advert} deleteAdvert={deleteAdvert} getAdverts={getAdverts}/>
      })}
      <AddCustomerForm displayUsertDrawer={displayUsertDrawer} setDisplayUserDrawer={setDisplayUserDrawer} user={user} getUsers={getUsers}/>
    </tbody>
  )
}

export default CustomerTableBody