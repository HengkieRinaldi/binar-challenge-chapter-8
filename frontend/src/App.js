import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"
import Navigation from "./components/Navigation"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import AddUser from './users/AddUser'
import EditUser from './users/EditUser'
import ListUser from './users/ListUser'
const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
        <Routes>
          <Route path='/' element= {<ListUser /> } />   
          <Route path='/add' element= {<AddUser /> } />  
          <Route path='/edit/:id' element= {<EditUser /> } />  
        </Routes>
    </BrowserRouter>
  )
}

export default App