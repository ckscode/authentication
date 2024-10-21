import React, { useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { authenticate, isAuth } from "../../Components/Helpers/Helpers";


const ResetPassword = () => {
    const [data,setData] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();
    const resetPasswordLink = id;

useEffect(()=>{
    {isAuth()&&navigate('/')}
setData({resetPasswordLink})

},[])
   
    const handleChange = (e) =>{
        const {name,value} = e.target
         setData({...data,[name]:value})
    }

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            if(data.newPassword===data.confirmPassword){
                await axios.put(`${process.env.REACT_APP_API_URL}/api/reset-password`,data).then(response=>{
                console.log("RESET PASSWORD RESPONSE",response);
                setData('')
                toast.success(response.data.message)
                navigate('/signin')
            }).catch(error=>{
                console.log('RESET PASSWORD ERROR', error);
                setData({...data});
                toast.error(error.response.data.error);
            }
            )
            }else{
                toast.error('New password and Confirm password doest not match'); 
            }
              
         
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
   

    }
    return (
        <div>
        
        <form onSubmit={handleSubmit} className="row">
          <div className="col-sm-6 col-md-3 m-auto mt-5">
          <h1 className="mb-3">Reset Password</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              name="newPassword"
              id="exampleInputPassword"
              onChange={handleChange}
              value={data?.newPassword||""}
            required
            />
           {data?.newPassword?.length<6&&<label htmlFor="exampleInputPassword" className="text-danger">Password must be atleast 6 characters</label>} 
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputConfirm" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              id="exampleInputConfirm"
              onChange={handleChange}
              value={data?.confirmPassword||""}
               required
            />
            {(data.confirmPassword&&data.newPassword!==data.confirmPassword)&&<label htmlFor="exampleInputPassword" className="text-danger">Does not match with new password </label>}
          </div>
          <button  className="btn btn-primary">
            Submit
          </button>
          </div>
        </form>
      </div>
    );
};

export default ResetPassword;