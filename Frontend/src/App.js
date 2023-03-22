import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'

// importing components
import Home from "./Pages/Home/Home"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Settings from "./Pages/Settings/Settings"

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
