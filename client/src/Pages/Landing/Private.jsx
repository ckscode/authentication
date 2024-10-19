import React, { useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { getCookie, isAuth, signOut, updateUser } from "../../Components/Helpers/Helpers";
import { Link, useNavigate } from "react-router-dom";


const Private = () => {
    const [data,setData] = useState({
        role:"",
        name:"",
        email:"",
        password:""
    });
    const navigate = useNavigate();
   const token = getCookie("token")
    const getData = async() =>{
        try{
            await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${isAuth()._id}`,
            {headers:{
                authorization: `Bearer ${token}`
            }}).then(response=>{ setData(response.data.data)
                console.log('private profile update ',response)
            }).catch(error=>
                {
                    console.log('private profile update error',error.response.data.error)
                    if(error.response.status===401){
                        signOut(()=>{navigate('/')})
                    }
                    toast.error(error.message)
                });
           
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
     
    }
    useEffect(()=>{
        getData()
    },[])
    
    useEffect(()=>{
      {isAuth().role==="subscriber"&&navigate('/private')}
      {isAuth().role==="admin"&&navigate('/admin')}
     
    },[])

    const handleChange = (e) =>{
        const {name,value} = e.target
         setData({...data,[name]:value})
    }

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
             await axios.put(`${process.env.REACT_APP_API_URL}/api/user/update`,data,
              {headers:{
                authorization: `Bearer ${token}`
            }}
             ).then(response => {
                console.log('PRIVATE PROFILE RESPONSE', response);
                 updateUser(response,()=>{
                  toast.success("profile updated successfully!");
                 })
               
            })
            .catch(error => {
                console.log('PRIVATE PROFILE ERROR', error.response.data);
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
        <h1 className="mb-1 text-center">Private</h1>
        <p className="lead text-center">Update User</p>
        <div className="mb-3">
          <label htmlFor="exampleInputRole" className="form-label">
            Role
          </label>
          <input
            type="text"
            name="role"
            className="form-control"
            id="exampleInputRole"
            onChange={handleChange}
            value={data?.role||""}
            disabled
          />
        </div>
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
            disabled
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
       <div className="w-100 d-flex align-items-center">
       <button type="submit" className="btn btn-primary">
          Submit
        </button>
       <Link className="text-decoration-none ms-auto" to='/order'>Back to order</Link>
       </div>
     
        </div>
      </form>
    </div>
  );
};

export default Private;