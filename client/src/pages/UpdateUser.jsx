import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { BASE_URL } from "../../services/helper"

export const UpdateUser = () => {
  const params = useParams();
  const { authorizationToken } = useAuth();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: ''
  });

  
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/users/${params.id}`, {
          method: "GET",
          headers: {
            "Authentication": authorizationToken
          }
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log("Cannot fetch user", error);
      }
    };

    useEffect(() => {

    fetchUser();
  }, [params.id, authorizationToken]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/admin/users/update/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authentication": authorizationToken
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        console.log("User updated successfully");
        // Optionally, redirect or display a success message
      } else {
        console.log("Failed to update user",response);
      }
    } catch (error) {
      console.log("Error while updating user", error);
    }
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
      <div>
        Name :  <input className='px-3 py-2 bg-gray-700' type="text" name="name" value={user.name} onChange={handleChange} />
         </div>
      <br />
      <div>
        Email : <input className='px-3 py-2 bg-gray-700 ' type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
      <br />
      <div>
        Phone : <input className='px-3 py-2 bg-gray-700 ' type="text" name="phone" value={user.phone} onChange={handleChange} />
       </div>
      <br />
      <button  type="submit">Update User</button>
    </form>
  );
};


