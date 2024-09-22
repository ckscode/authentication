import React, { useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authenticate, isAuth } from "../../Components/Helpers/Helpers";
const ForgotPassword = () => {
    const [data,setData] = useState("");
    const navigate = useNavigate();
useEffect(()=>{
    {isAuth()&&navigate('/')}
},[])


   
    const handleChange = (e) =>{
        const {name,value} = e.target
         setData({...data,[name]:value})
    }

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            console.log(data)
            await axios.put(`${process.env.REACT_APP_API_URL}/api/forgot-password`,data).then(response=>{
                console.log("FORGOT PASSWORD RESPONSE",response.data);
                setData({...data})
                toast.success(response.data.message)
            }).catch(error=>{
                console.log('FORGOT PASSWORD ERROR', error);
                setData({...data});
                toast.error(error.response.data.error);
            }
            )
            //  await axios.post(`${process.env.REACT_APP_API_URL}/api/signin`,data).then(response => {
            //     console.log('SIGNIN SUCCESS', response);
            //     authenticate(response,()=>{
            //       setData('');
            //       toast.success(`Hey,${response.data?.user.name} Welcome`);
            //       {isAuth().role==="subscriber"&&navigate('/private')}
            //       {isAuth().role==="admin"&&navigate('/admin')}
            //     })

            // })
            // .catch((error) => {
            //    console.log('SIGNIN ERROR', error);
            //     setData({ ...data });
            //     toast.error(error.response.data.error);
            // });
         
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
   

    }
    return (
        <div>
        
        <form onSubmit={handleSubmit} className="row">
          <div className="col-sm-6 col-md-3 m-auto mt-5">
          <h1 className="mb-3">Forgot Password</h1>
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
          <button  className="btn btn-primary">
            Submit
          </button>
          </div>
        </form>
      </div>
    );
};

export default ForgotPassword;