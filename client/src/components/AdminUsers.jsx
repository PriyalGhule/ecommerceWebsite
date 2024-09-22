import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import {Link} from "react-router-dom";
import { BASE_URL } from "../../services/helper"


export const AdminUsers = () => {

    const {authorizationToken}=useAuth();
    const [users, setUsers]=useState([]);

    const getAllUsers=async ()=>{
        
        try{

            const response=await fetch(`${BASE_URL}/admin/users`,{
                method:"GET",
                headers:{
                    "Authentication" : authorizationToken
                }
            });


            const data=await response.json();
            console.log(`users ${data}`);
            setUsers(data);

        }
        catch(error){
            console.log("Cannot fetch users ",error);
        }
    }


    const deleteUser=async(id) =>{
        try{
        console.log(id);
        const response=await fetch(`${BASE_URL}/admin/users/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Authentication":authorizationToken
            },

        });
        const data=await response.json();
        console.log(`users deleted : ${data}`);

        if(response.ok){
            getAllUsers();
        }
    }catch(error){
        console.log("Error while deleting ",error);
    }

    }


    useEffect(()=>{
        getAllUsers();
    },[])



  return (

       
        <table className='min-w-full table-auto border-spacing-3 shadow-md rounded-lg overflow-hidden'>
            <thead className='bg-gray-400 border-b-2 border-gray-300'>
            <tr>
                <th className="px-6 py-3 text-left text-s font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-s font-semibold text-gray-700 uppercase tracking-wider">email</th>
                <th className="px-6 py-3 text-left text-s font-semibold text-gray-700 uppercase tracking-wider">phone</th>
                <th className="px-6 py-3 text-left text-s font-semibold text-gray-700 uppercase tracking-wider">Edit</th>
                <th className="px-6 py-3 text-left text-s font-semibold text-gray-700 uppercase tracking-wider">Delete</th>
            </tr>
            </thead>

            <tbody className='divide-y divide-gray-400'>
            {users.map((curr,index)=>{

return <tr key={index}>
                <td className='border-gray-100' text-left >{curr.name}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{curr.email}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{curr.phone}</td>
                <td className='px-6 py-4 whitespace-nowrap'><Link to={`/admin/users/${curr._id}/edit`}>Update</Link></td>
                <td className='px-6 py-4 whitespace-nowrap'><button onClick={()=>deleteUser(curr._id)}>Delete</button></td>
            </tr>
     })}
     </tbody>
     </table>
   
  )


}
