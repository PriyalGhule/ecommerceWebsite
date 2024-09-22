import { useAuth } from "../store/auth"
import books from '../images/books.jpg'

export const Home=()=>{
    const {user}=useAuth();
    return <div className="flex m-8">
    <div className="flex-column">
    <h1 className=" text-white-400 text-4xl font-bold">Welcome {user?`${user.name} to our website`:"to our website"}
    
    </h1>
   <p className="m-5"> Lorem ipsum dolor sit amet. Qui officiis fuga sit autem labore nam voluptatum error. In dolorem eius est possimus quaerat qui eligendi ullam et amet quasi sed laboriosam consequatur non saepe iste rem dolor omnis.
    
    </p>
    </div>
    <img src={books} className="w-2/5">

    </img>
    </div>
}