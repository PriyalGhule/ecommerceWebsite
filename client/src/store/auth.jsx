import { useContext, useEffect, useState } from "react";
import {createContext} from "react";
import { BASE_URL } from "../../services/helper"



export const AuthContext=createContext();





export const AuthProvider=({children})=>{

    const[token, setToken]=useState(localStorage.getItem('token'));
    const [user, setUser]=useState("");
    const [service, setServices]=useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const authorizationToken=`Bearer ${token}`;
    const storeToken=(serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("token",serverToken);
    }

    let isLoggedIn=!!token;
    


    const LogoutUser=()=>{
        setToken("");
        return localStorage.removeItem('token');
    }



//contact form autofill
    const userAuthentication=async ()=>{
        try{
            const response=await fetch(`${BASE_URL}/user`,
    
            {
                method:"GET",
                headers:{
                    "Authentication":`Bearer ${token}`,
    
                },
    
            })
    
    
            if(response.ok){
                const data=await response.json();
                
                console.log("User data",data.msg);
                setUser(data.msg);
                setIsAdmin(data.msg.isAdmin);
                console.log("The value of isAdmin is",data.msg.isAdmin);
    
            }
        }
        catch(error){
            console.log("error in fetching data",error);
        }
    }


    const getServices=async ()=>{
        try{

            const response=await fetch(`${BASE_URL}/services`,{method:"GET"});


                if(response.ok){
                    const data=await response.json();
                    console.log(data.msg);
                    setServices(data.msg);

                }
        

        }
        catch(error){
            console.log("something is wrong while fetching cards data ",error);
        }
    }

    useEffect(()=>{
        getServices();
        userAuthentication();
},[]);

    

    return <AuthContext.Provider value={{LogoutUser,isLoggedIn,storeToken, user,service,authorizationToken,isAdmin}}>
        {children}
        </AuthContext.Provider>
}


export const useAuth=()=>{
    const authContextValue= useContext(AuthContext);


    if(!authContextValue){
        throw new Error("useAuth was outside of a provider");
    }
    return authContextValue;
}