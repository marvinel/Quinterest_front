import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './public/Login';
import Register from './public/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
