
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './public/Login';
import Register from './public/Register';
import Home from './public/Home';
import Header from './public/Header';
import Perfil from './private/Perfil'

function App() {
  return (
    <div>
      < Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil/:id" element={<Perfil />} />
      </Routes>
    </div>
  );
}

export default App;
