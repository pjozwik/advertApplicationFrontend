import React, { useEffect } from 'react'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import logo from '../Assets/logo.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { setAuthToken, request, setRole } from '../../api/axiosConfig';
import { useAuth } from '../Contexts/AuthContext';

function Login() {

  const location = useLocation();
  const [action, setAction] = useState(location.state?.action !== null ? location.state.action : "Login");
  const navigate = useNavigate();
  const [userName, setUsername] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, getCustomerFromToken } = useAuth();

  useEffect(() => {
    localStorage.clear();
  })

  const handleLogin = async () => {
    setAction("Login");
    const user = {
      userName,
      password
    }

    if (userName !== '' && password !== '') {
      await request("/api/authenticate", user, "POST")
        .then(function (response) {
          setAuthToken(response.data.token);
          setRole(response.data.role);
          login(response.data.token);
          getCustomerFromToken();
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const handleRegister = async () => {
    setAction("Sign up");
    const user = {
      name,
      surname,
      userName,
      password,
      email,
      roles: "USER"
    }

    if (userName !== '' && password !== '') {
      await request("/api/users/register", user, "POST")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <div className='login-container'>
      <img width={70} height={70} className='logo' src={logo} alt="" />
      <div className='login-header'>
        <h1>{action}</h1>
      </div>
      <div className='login-inputs'>
        {action === "Sign up" && <div className='login-input'>
          <FontAwesomeIcon icon={faUser} className='userIcon' />
          <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>}
        {action === "Sign up" && <div className='login-input'>
          <FontAwesomeIcon icon={faUser} className='userIcon' />
          <input type="text" placeholder='Surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
        </div>}
        <div className='login-input'>
          <FontAwesomeIcon icon={faUser} className='userIcon' />
          <input type="text" placeholder='Username' value={userName} onChange={(e) => setUsername(e.target.value)} />
        </div>
        {action === "Sign up" && <div className='login-input'>
          <FontAwesomeIcon icon={faEnvelope} className='emailIcon' />
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>}
        <div className='login-input'>
          <FontAwesomeIcon icon={faLock} className='lockIcon' />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className='buttons'>
        <button className={action === "Login" ? 'login-btn' : 'login-btn gray'} onClick={() => handleLogin()}>Login</button>
        <button className={action === "Sign up" ? 'signUp-btn' : 'signUp-btn gray'} onClick={() => handleRegister()}>Sign up</button>
      </div>
    </div>
  )
}

export default Login