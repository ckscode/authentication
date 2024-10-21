import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
          <div className='text-center my-5'>
          <h1>Ultimate Authentication Boilerplate</h1>
          <h5>MERN Stack Authentication with Google and Facebook with Razorpay</h5>
          <Link to="/order" className="btn btn-primary">Razorpay</Link>
          </div>
        </div>
    );
};

export default Home;