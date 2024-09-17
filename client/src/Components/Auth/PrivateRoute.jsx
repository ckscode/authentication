import React from 'react';
import { isAuth } from '../Helpers/Helpers';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const user = isAuth()
    const location = useLocation();
    return user.role==='subscriber' ? (
        children
      ) : (
        <Navigate 
          to="/signin" 
          state={{ from: location }} 
        />
      );
};

export default PrivateRoute;