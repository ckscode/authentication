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
import PrivateRoute from './Components/Auth/privateRoute';
import AdminRoute from './Components/Auth/AdminRoute';
import Admin from './Pages/Landing/Admin';

function App() {
 

  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
   
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index exact element={
          <Home/>}/>
           <Route path='/signup' element={
          <Signup/>}/>
          
          <Route path='/signin' element={
          <Signin/>}/>
            <Route path='/auth/activate/:token' element={
          <Activate/>}/>
            <Route path='/private' element={
             <PrivateRoute>
              <Private/>
             </PrivateRoute>}/>
             <Route path='/admin' element={
             <AdminRoute>
              <Admin/>
             </AdminRoute>}/>    
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
