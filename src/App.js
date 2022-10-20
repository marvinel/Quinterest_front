import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./public/Login";
import Register from "./public/Register";
import Home from "./public/Home";
import Header from "./public/Header";
import Perfil from "./private/Perfil";

import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="image/" element={<Home />}>
              <Route path=":imageid" element={<Home />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil/:id/" element={<Perfil />}>

            <Route path="image/" element={<Perfil />}>
              <Route path=":imageid" element={<Perfil />} />
            </Route>
          </Route>
          <Route path='*' element={<h1>No se encuentra</h1>} />

        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
