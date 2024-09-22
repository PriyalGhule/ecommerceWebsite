import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../store/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../services/helper"



export const Register=()=>{

    const [user, setUser]=useState({
        name:"",
        email:"",
        phone:"",
        password:"",
    });

    const navigate=useNavigate();
    const {storeToken}=useAuth();

    const handleInput=(e)=>{
        console.log(e);
        let name=e.target.name;
        let value=e.target.value;


        setUser({
            ...user,
            [name]:value,
        })
    }

    const handleForm=async (e)=>{
        e.preventDefault();
        
        console.log(user);
        try{

        
        const response=await fetch(`${BASE_URL}/register`,{
            method:"POST",
            headers:{
            "Content-Type":"application/json"
            },
            body:JSON.stringify(user),

        });
        console.log(response);


        const res_data=await response.json();
            console.log("res_data : ",res_data.extraDetails);
        if(response.ok){
            setUser({
                name:"",
                email:"",
                phone:"",
                password:"",
            });


            toast.success("Registered successfully");

            
            
            navigate("/");
            storeToken(res_data.token);
        }else{
            toast.error(res_data.extraDetails)
        }
    }catch(error){
        console.log("register",error);
        console.log("register validation error",error);
    }
    }


    return (<>
    <h1 className="text-3xl font-bold mb-5">Register</h1>
    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={handleForm}>
     <input type="text" className="max-w-sm py-2 border border-grey-50 rounded-lg text-center" name="name" placeholder='Name' value={user.username} onChange={handleInput}/>
     <input type="text" className="max-w-sm py-2 border border-grey-50 rounded-lg text-center" name="email" placeholder='Email' value={user.email} onChange={handleInput}/>
     <input type="text" className="max-w-sm py-2 border border-grey-50 rounded-lg text-center" name="phone" placeholder='Phone' value={user.phone} onChange={handleInput}/>
     <input type="text" className="max-w-sm py-2 border border-grey-50 rounded-lg text-center" name="password" placeholder='Password' value={user.password} onChange={handleInput}/>
    <button type="submit" value="submit">Submit</button>
    </form>
    </>)
}