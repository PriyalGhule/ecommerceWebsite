import {React} from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { IoMdBook } from "react-icons/io";

export const AdminLayout=()=>{
  return (
    <div>
      <nav >
        <ul className='max-w-screen-xl flex flex-row flex-wrap items-center justify-between mx-auto mb-8 mt-8'>
            <li>
             <NavLink to="/admin/users" ><FaUser />Users</NavLink>
                
                </li>
            <li>
                
            <NavLink to="/admin/contacts" > <MdContacts /> contacts </NavLink>
            </li>
            
            <li><NavLink to="/home"> <MdHome />home</NavLink></li>

            <li>
               <NavLink to="/services"> <IoMdBook />services</NavLink>
                </li>
        </ul>
      </nav>
      <Outlet/>
    </div>
  )
}
