import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router'
import HomePages from './pages/HomePages'  
import Contactpages from './pages/ContactPages'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePages />}/>
        <Route path='/contact' element={<Contactpages />}/>
      </Routes>
    </div>
    
  )
}

export default App
