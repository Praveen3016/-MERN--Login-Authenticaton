import React ,{useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
  
function Home() {
const   navigate = useNavigate();
const {setIsAuthenticate ,setDbToken} = useAuth();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/home', { withCredentials: true });
           
        console.log( "hh" +response.data.tokenB);
        setDbToken(response.data.tokenB)

      
   
        // setToken()
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    checkToken();
  }, [navigate]);


  const logout = async () =>{
    try {
      const response = await axios.get('http://localhost:3000/api/user/logout', { withCredentials: true });
      console.log(response);
      setIsAuthenticate(false)

      navigate('/login');

    } catch (error) {
      console.log("logot error" , error)
    }
  }


  return (
    <div>
      home
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default Home
