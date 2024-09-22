import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../store/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../services/helper"



export const Login=()=>{

    const [user, setUser]=useState({
        email:"",
        password:"",
    });

    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;


        setUser({
            ...user,
            [name]:value,
        })
    }

    const navigate=useNavigate();
    const {storeToken}=useAuth();

    

    const handleForm=async (e)=>{
        e.preventDefault();
        
        console.log(e);
        try{
        const response= await fetch(`${BASE_URL}/login`,{
            method:"POST",
            headers:{
            "Content-Type":"application/json"
            },
            body:JSON.stringify(user),
        })

        
        

        console.log(response);


        const res_data=await response.json();
        console.log("res_data : ",res_data.extraDetails?res_data.extraDetails:"Invalid credentials");
        if(response.ok){
            toast.success("Login successfull");
            setUser({
                email:"",
                password:"",
            })

            
            navigate("/");
            storeToken(res_data.token);
        }else{
            toast.error(res_data.extraDetails?res_data.extraDetails:"Invalid credentials")
        }
    }
    catch(error){
        console.log("Login form ",error);
    }
    }
    return <>
    <h1 className="text-3xl font-bold mb-5">Login</h1>
    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6" onSubmit={handleForm}>
         <input type="text" className="max-w-sm py-2 border border-grey-50 rounded-lg text-center" name="email" placeholder="Email" value={user.email} onChange={handleInput}/>
         <input type="text" className="max-w-sm py-2 border border-grey-50 rounded-lg text-center" name="password" placeholder="Password" value={user.password} onChange={handleInput}/>
        <button type="submit">Submit</button>
    </form>
    </>
}