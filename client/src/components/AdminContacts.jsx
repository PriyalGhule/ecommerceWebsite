import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import { BASE_URL } from "../../services/helper"



export const AdminContacts = () => {

  const {authorizationToken}=useAuth();
    const [contacts, setContacts]=useState([]);

    const getAllContacts=async()=>{
      try{

        const response=await fetch(`${BASE_URL}/admin/contacts`,{
          method:"GET",
          headers:{
            "Authentication":authorizationToken
          }
        });

        const data=await response.json();
        setContacts(data);

        console.log("Contacts are fetched in frontend console ",data);

      }
      catch(error){
        console.log("Cannot fetch contacts in react ",error);
      }
    }


    const deleteContact=async(id)=>{
      try{
        const response=await fetch(`${BASE_URL}/admin/contacts/delete/${id}`,{
          method:"DELETE",
          headers:{
            "Authentication":authorizationToken
          }
        });

        const data=await response.json();
        console.log(`contacts deleted : ${data}`);

        if(response.ok){
          getAllContacts();
      }

      }
      catch(error){

        console.log("Error while deleting contacts on frontend ",error);

      }
    }



    useEffect(()=>{
      getAllContacts();
  },[])
    
   const divstyle={
    display:'flex',
    flexDirection:'row',
   }

  return (

    <>
    <div className="p-6 bg-gray-700 min-h-screen">
  <div className="grid grid-cols-4 gap-4 bg-gray-800 shadow-md p-4 rounded-lg">
    <p className="font-semibold">Name</p>
    <p className="font-semibold">Email</p>
    <p className="font-semibold">Message</p>
    <p className="font-semibold text-center">Delete</p>
  </div>

  {contacts.map((curr, index) => (
    <div
      key={index}
      className="grid grid-cols-4 gap-4 items-center bg-gray-800 shadow-md p-4 rounded-lg mt-4"
    >
      <p className="text-white">{curr.name}</p>
      <p className="text-white">{curr.email}</p>
      <p className="text-white">{curr.message}</p>
      <button
        onClick={() => deleteContact(curr._id)}
        className="text-red-500 hover:text-red-700 text-center"
      >
        Delete
      </button>
    </div>
  ))}
</div>

    
    </>
  )
}


