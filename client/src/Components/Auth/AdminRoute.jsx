import React from 'react';
import { isAuth } from '../Helpers/Helpers';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const user = isAuth()
    const location = useLocation();
    return user && user.role==="admin" ? (
        children
      ) : (
        <Navigate 
          to="/signin" 
          state={{ from: location }} 
        />
      );
};

export default AdminRoute;