import React, { useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Activate = () => {
    const [data,setData] = useState("");
    const {token} = useParams();
    const {name} = jwtDecode(token);
    const navigate = useNavigate()
  useEffect(()=>{
    if(token){
        setData({...data,token,name})
    }
  },[])

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            console.log('here')
             await axios.post(`${process.env.REACT_APP_API_URL}/api/account-activation`,{token}).then(response => {
                console.log('SIGNIN SUCCESS', response);
                setData('');
                toast.success(response.data.message);
                navigate('/signin')
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data.error);
                setData({ ...data });
                toast.error(error.response.data.error);
            });
         
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
   

    }
  return (
    <div>
        <div className="w-50 text-center m-auto mt-5">
            <h1>Hey, {name} want to Activate Activate your Account ?</h1>
            <button onClick={(e)=>handleSubmit(e)} className="btn btn-lg btn-outline-primary rounded-1 mt-3">
          Activate Account
        </button>
        </div>
    </div>
  );
};

export default Activate;
