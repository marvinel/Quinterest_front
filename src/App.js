import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './public/Login';
import Register from './public/Register';
import Home from './public/Home';
import Header from './public/Header';
function App() {
  return (
    <div>
      < Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Register />} />
        <Route path="/register" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
