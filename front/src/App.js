import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './App.css'
import Cards from './components/Cards/Cards.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

import { Routes, Route } from 'react-router-dom';

// import styled from 'styled-components'
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Error from './components/Error/Error';
import Form from "./components/Form/Form.jsx"
import Favorites from './components/Favorites/Favorites';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = 'alejo@mail.com';
  const password = 'alejo123';

  const [access, setAccess] = useState(false);

  const [characters, setCharacters] = useState([]);

  /* const example = {
    name: 'Morty Smith',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
 }; */

  function login(userData) {
    if (userData.password === password && userData.username === username) {
      setAccess(true);
      navigate('/home');
    }
  }

  const onSearch = (character) => {
    fetch(`http://localhost:3001/rickandmorty/onsearch/${character}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert('No hay personajes con ese ID');
        }
      });
  }

  const onClose = (id) => {
    setCharacters(characters.filter(char => char.id !== id))
  }

  useEffect(() => {
    !access && navigate('/');
  }, [access]);

  return (
    <div>
      {location.pathname !== '/' && <Navbar onSearch={onSearch} />}
      <Routes>
        <Route exact path='/' element={<Form login={login} />} />
        <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
        <Route path='/about' element={<About />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/detail/:detailId' element={<Detail />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
    //   <div>
    // <Estrellas>
    // <div className='App' style={{ padding: '25px' }}>
    //     <Navbar onSearch={onSearch}/>
    //   </div>
    //   <div>
    //     <Cards
    //       characters={characters}
    //       onClose={onClose}
    //     />
    //   </div>
    // </div>
    // </Estrellas>
  )
}

export default App
