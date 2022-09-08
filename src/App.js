
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './public/Login';
import Register from './public/Register';
import Home from './public/Home';
import Header from './public/Header';
import Perfil from './private/Perfil'
import {UserContextProvider} from './context/UserContext';


function App() {
  return (
    <UserContextProvider>
    <div>
      < Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil/" element={<Perfil />} > 
        <Route path=":id" element={<Perfil />}/>
        </Route>
      </Routes>
    </div>
    </UserContextProvider>
  );
}

export default App;
