import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      navigate('/');
    }
  },[])
  const handleLogin=async (e)=>{
    e.preventDefault();
    try {
      const data= {email,password};
      const response = await axios.post('https://diabetes-predictor-2-llkg.onrender.com/api/auth/signin', data);
      if(response.status == 200){
        localStorage.setItem('token', response.data.token);
        alert('Signed in successfully');
        navigate('/');
      }
    } catch (error) {
        console.error("Error during signin:", error.message);
        alert("An error occurred during signup.Please try again");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50'>
        <div className='bg-white p-8 rounded-2xl shadow-lg w-96'>
            <h2 className='text-2xl font-bold text-center text-teal-600 mb-6'>Login</h2>
            <form onSubmit={handleLogin} className='flex flex-col space-y-4'>
                <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2  focus:ring-teal-500'></input>
                <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2  focus:ring-teal-500'></input>
                <button  type="submit" className='bg-teal-600 text-center text-white py-3 rounded-lg hover:bg-teal-700'>Login</button>
            </form>
            <p className='text-sm text-gray-600 mt-4 text-center'>Don't have an account?{" "}
                <a href="/signup" className='text-teal-600 hover:underline'>Signup</a>
            </p>  
        </div>
    </div>
  )
}

export default Login
