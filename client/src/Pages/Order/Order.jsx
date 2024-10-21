import "./Order.css"
import TshirtImg from "./tshirt.svg";
import React, { useEffect,useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { getCookie, isAuth, signOut, updateUser } from "../../Components/Helpers/Helpers";
import { useNavigate } from "react-router-dom";

const Order = () => {
    const [data,setData] = useState();

    const amount = 500;
    const currency = "INR";
    const receiptId = "qwsaq1";

    const navigate = useNavigate();
    const token = getCookie("token")
     const getData = async() =>{
         try{
             await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${isAuth()._id}`,
             {headers:{
                 authorization: `Bearer ${token}`
             }}).then(response=>{ setData(response.data.data)
                
             }).catch(error=>
                 {
                     console.log('private profile update error',error.response.data.error)
                     if(error.response.status===401){
                         signOut(()=>{navigate('/')})
                     }
                     toast.error(error.message)
                 });
            
         }catch(error){
             toast.error(error.message)
         }
      
     }
     useEffect(()=>{
         getData()
     },[])
  
    const paymentHandler = async (e) => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/order`, {
                method: "POST",
                body: JSON.stringify({
                  amount,
                  currency,
                  receipt: receiptId,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const order = await response.json();
          
              const options = {
                key: process.env.REACT_APP_RAZOR_ID, // Enter the Key ID generated from the Dashboard
                amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency,
                name: "Acme Corp", //your business name
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: async function (response) {
                  const body = {
                    ...response,
                  };
              
                  const validateRes = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/order/validate`,
                    {
                      method: "POST",
                      body: JSON.stringify(body),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  const jsonRes = await validateRes.json();
                  console.log(jsonRes);
                  alert(`payment status: ${jsonRes.msg}`)
                },
                prefill: {
                  //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                  name: data.name, //your customer's name
                  email: data.email,
                },
                method: '',
                notes: {
                  address: "Razorpay Corporate Office",
                },
                theme: {
                  color: "#3399cc",
                },
              };
              const rzp1 = new window.Razorpay(options);
              rzp1.on("payment.failed", function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
              });
              if (window.Razorpay) {
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
              } else {
                console.error('Razorpay SDK not loaded');
              }
              e.preventDefault();
        }catch(error){
            console.log(error)
        }
      
    };
  return (
    <div className="product mx-auto">
      <h2>Tshirt</h2>
      <p>Solid blue cotton Tshirt</p>
      <img src={TshirtImg} alt="thsirt"/>
      <br />
      <button className="btn btn-dark" onClick={paymentHandler}>Pay</button>
    </div>
  );
};

export default Order;
