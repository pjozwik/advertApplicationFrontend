import React from 'react'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import logo from '../Assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { setAuthToken, request, setRole } from '../../api/axiosConfig';

function Login() {

  const [action, setAction] = useState("Login");
  const navigate = useNavigate();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setAction("Login");
    const user = {
      userName,
      password
    }

    await request("/api/authenticate", user, "POST")
      .then(function (response) {
        setAuthToken(response.data.token);
        setRole(response.data.role)
        navigate("/", { token: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

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
          <input type="text" placeholder='Name' />
        </div>}
        {action === "Sign up" && <div className='login-input'>
          <FontAwesomeIcon icon={faUser} className='userIcon' />
          <input type="text" placeholder='Surname' />
        </div>}
        <div className='login-input'>
          <FontAwesomeIcon icon={faUser} className='userIcon' />
          <input type="text" placeholder='Username' value={userName} onChange={(e) => setUsername(e.target.value)} />
        </div>
        {action === "Sign up" && <div className='login-input'>
          <FontAwesomeIcon icon={faEnvelope} className='emailIcon' />
          <input type="email" placeholder='Email' />
        </div>}
        <div className='login-input'>
          <FontAwesomeIcon icon={faLock} className='lockIcon' />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className='buttons'>
        <button className={action === "Login" ? 'login-btn' : 'login-btn gray'} onClick={() => handleLogin()}>Login</button>
        <button className={action === "Sign up" ? 'signUp-btn' : 'signUp-btn gray'} onClick={() => setAction("Sign up")}>Sign up</button>
      </div>
    </div>
  )
}

export default Login