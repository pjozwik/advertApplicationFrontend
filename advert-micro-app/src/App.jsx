import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home}>
          </Route>
          <Route path="/login" Component={Login}>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
