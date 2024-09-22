import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home} from './pages/home'
import {About} from './pages/about';
import { Contact } from './pages/contact';
import { Register } from './pages/register';
import { Login} from './pages/login';
import { Service } from './pages/service';
import { Navbar } from './components/Navbar';
import {Error} from './pages/404error';
import {Logout} from './pages/logout';
import { AdminLayout } from './pages/admin-layout';

import {AdminContacts} from './components/AdminContacts';
import {UpdateUser} from './pages/UpdateUser';
import { AdminUsers } from './components/AdminUsers';
import './styles.css';

const App=()=>{


  return (<>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
     <Route path="/about" element={<About/>}></Route>
    <Route path="/contact" element={<Contact/>}></Route>
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/service" element={<Service/>}></Route>
    <Route path="/logout" element={<Logout/>}></Route>
    <Route path="/admin" element={<AdminLayout/>}>
      <Route path="users" element={<AdminUsers/>}/>
      <Route path="contacts"element={<AdminContacts/>}/>
      <Route path="users/:id/edit" element={<UpdateUser/>} />
    </Route>
    <Route path="*" element={<Error/>}></Route>
  </Routes>
  </BrowserRouter>
  
  </>);

}

export default App;