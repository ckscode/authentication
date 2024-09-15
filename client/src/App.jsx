import React from 'react'
import Layout from './Components/Layout'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signup from './Pages/Signup/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from './Pages/Signin/Signin';
import Activate from './Pages/ActivateAccount/Activate';
import Private from './Pages/Landing/Private';

function App() {
 

  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
   
      <Routes>
        <Route path='/' element={
           <Layout><Home/></Layout>}/>
        <Route path='/signup' element={
          <Layout><Signup/></Layout>}/>
          <Route path='/signin' element={
          <Layout><Signin/></Layout>}/>
            <Route path='/auth/activate/:token' element={
          <Layout><Activate/></Layout>}/>
            <Route path='/landing' element={
          <Layout><Private/></Layout>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
