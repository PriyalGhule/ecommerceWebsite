import '../App.css';

import { useAuth } from '../store/auth';



export const Service=()=>{
    const {service}=useAuth();
    return <> <h1 className='text-4xl mb-5'>Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
      {service.map((card, index) => {
       const {category,price,product }=card; 
       return(
        <div className="max-w-sm rounded shadow-lg border border-white-200" key={index}>
            <img src="/images/computer.jpg" className='w-full'/>
            <p>{product}</p>
            <p>{category}</p>
            <p>{price}</p>
            </div>
       )
        
      })}
    </div></>  
}
