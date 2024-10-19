import React, { useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, isAuth } from "../../Components/Helpers/Helpers";
import Google from "../../Components/Auth/Google";
import Facebook from "../../Components/Auth/Facebook";


const Signin = () => {
    const [data,setData] = useState("");
    const navigate = useNavigate();

useEffect(()=>{
  {isAuth().role==="subscriber"&&navigate('/order')}
  {isAuth().role==="admin"&&navigate('/admin')}
},[])

   
    const handleChange = (e) =>{
        const {name,value} = e.target
         setData({...data,[name]:value})
    }

    const redirectUser = (response) =>{
      authenticate(response,()=>{
        toast.success(`Hey,${response.data?.user.name} Welcome`);
        {isAuth().role==="subscriber"&&navigate('/order')}
        {isAuth().role==="admin"&&navigate('/admin')}
      })
    }

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
             await axios.post(`${process.env.REACT_APP_API_URL}/api/signin`,data).then(response => {
                console.log('SIGNIN SUCCESS', response);
                authenticate(response,()=>{
                  setData('');
                  toast.success(`Hey,${response.data?.user.name} Welcome`);
                  {isAuth().role==="subscriber"&&navigate('/order')}
                  {isAuth().role==="admin"&&navigate('/admin')}
                })

            })
            .catch((error) => {
               console.log('SIGNIN ERROR', error);
                setData({ ...data });
                toast.error(error.response.data.error);
            });
         
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
   

    }
  return (
    <div className="row">
      <form onSubmit={handleSubmit} >
        <div className="col-sm-6 col-md-3 m-auto mt-5">
        <h1 className="mb-3">Sign In</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={data?.email||""}
          
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="exampleInputPassword1"
            onChange={handleChange}
            value={data?.password||""}
         
          />
        </div>
   
        <button  className="btn btn-primary mb-3">
          Submit
        </button>
        <br/>
        <Link className="text-decoration-none" to='/auth/password/forgot'>Forgot Password?</Link>
        <hr></hr>
        </div>
      </form>
      
      <div>
        
      <Google googleSignin={redirectUser}/>
  <br/>
  <Facebook facebookSignin={redirectUser}/>
      </div>

    </div>
  );
};

export default Signin;
