import React, { useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

const Signup = () => {
    const [data,setData] = useState("");

    const handleChange = (e) =>{
        const {name,value} = e.target
         setData({...data,[name]:value})
    }

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
             await axios.post(`${process.env.REACT_APP_API_URL}/api/signup`,data).then(response => {
                console.log('SIGNUP SUCCESS', response);
                setData('');
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SIGNUP ERROR', error.response.data);
                setData({ ...data, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
         
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
   

    }
  return (
    <div>
        
      <form onSubmit={handleSubmit} className="row">
        <div className="col-sm-6 col-md-3 m-auto mt-5">
        <h1 className="mb-3">Sign up</h1>
      <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="exampleInputName"
            onChange={handleChange}
            value={data?.name||""}
     
          />
        </div>
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
   
        <button  className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
