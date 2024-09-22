import { useState } from "react"
import { useAuth } from "../store/auth"
import { BASE_URL } from "../../services/helper"

export const Contact=()=>{
    const [contact, setContact]=useState({
        name:"",
        email:"",
        message:"",
    })

    const [userData, setUserData]=useState(true);


    const {user}=useAuth();

    if(userData && user){
        setContact({
        name:user.name,
        email:user.email,
        message:"",
    });

    setUserData(false);
    }

    const handleInput=(e)=>{
        console.log(e);
        let name=e.target.name;
        let value=e.target.value;


        setContact({
            ...contact,
            [name]:value,
        })
    }


    const handleForm=async (e)=>{
        e.preventDefault();
        
       console.log("Contact : ",contact);

       try{
        const response=await fetch(`${BASE_URL}/contactus`,{
            method:"POST",
            headers:{
            "Content-Type":"application/json"
            },
            body:JSON.stringify(contact),

        });


        if(response.ok){

            console.log("Contact info is sent to backend", contact);
            setContact({
                name:user.name,
                email:user.email,
                message:"",
                
            });

            
       }}catch(error){
        console.log("Contact form submit error ",error);
    }
    }


    
    return <><h1 className="text-3xl font-bold mb-5">Contact </h1>

<form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6" onSubmit={handleForm}>
     <input type="text" className="max-w-sm py-2 border border-grey-50 rounded-lg text-center" name="name" placeholder="Name" value={contact.name} onChange={handleInput}/>
    <input type="text" className="max-w-sm py-2 border border-grey-50 rounded-lg text-center" name="email" placeholder="email" value={contact.email} onChange={handleInput}/>
    <input type="text" className="max-w-sm py-2 border border-grey-50 rounded-lg text-center" name="message" placeholder="message" value={contact.message} onChange={handleInput}/>
    <br/><button type="submit" value="submit">Submit</button>
    </form>
    </>  
}
