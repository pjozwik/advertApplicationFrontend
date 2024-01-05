import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { jwtDecode } from "jwt-decode";
import { request } from '../../api/axiosConfig';

const AuthContext = createContext();

export function useAuth () {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  const [authCustomer, setAuthCustomer] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getLoggedInUserDetails = async (token) => {
    await request("/api/users/loggedUser", '', "GET")
        .then(function (response) {
          setAuthCustomer({
            userId: response.data.id,
            userName: response.data.userName,
            name: response.data.name,
            surname: response.data.surname,
            email: response.data.email,
            roles: token.roles
          })
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  const getCustomerFromToken = () => {
    let token = localStorage.getItem("auth_token");
    if (token) {
      token = jwtDecode(token);
      getLoggedInUserDetails(token);
    }
  }

  useEffect(() => {
    getCustomerFromToken()
    if(localStorage.getItem("auth_token")){
      setIsLoggedIn(true)
    }
  }, [])

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setIsLoggedIn(true);
    setAuthCustomer({
      username: decodedToken.sub,
      roles: decodedToken.scopes
    });
  }

  const logOut = () => {
    localStorage.removeItem("auth_token");
    setAuthCustomer(null);
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{
      authCustomer,
      setAuthCustomer,
      getCustomerFromToken,
      login,
      logOut,
      isLoggedIn,
      setIsLoggedIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}
