import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';

function SignUp() {
    const [name,setName] =useState("");
    const [email, setEmail] =useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const token= localStorage.getItem('token');
        if(token){
            navigate("/");
        }
    },[navigate])

    const handleSignup= async (e) =>{
        e.preventDefault();
        try {
            const data= {name, email, password};
            const response = await axios.post('https://diabetes-predictor-2-llkg.onrender.com/api/auth/signup' , data);
            if(response.status === 201){
                alert("Signup successful! Please login.")
                navigate('/login');
            }
        } catch (error) {
            console.error("Error during signup: ", error.message);
            alert("An error occurred during signup. Please try again.");  
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50'>
            <div className='bg-white p-8 rounded-2xl shadow-lg w-96'>
                <h2 className='text-2xl font-bold text-center text-teal-600 mb-6'>Sign up</h2>
                <form onSubmit={handleSignup} className='flex flex-col space-y-4'>
                    <input type="text" placeholder='Full Name' value={name} onChange={(e)=>setName(e.target.value)} className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2  focus:ring-teal-500'></input>
                    <input type="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2  focus:ring-teal-500'></input>
                    <input type="password" placeholder='Password'   value={password} onChange={(e)=>setPassword(e.target.value)}  className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2  focus:ring-teal-500'></input>
                    <button type="submit" className='bg-teal-600 text-center text-white py-3 rounded-lg hover:bg-teal-700'>Sign up</button>
                </form>
                <p className='text-sm text-gray-600 mt-4 text-center'>Already have an account?{" "}
                    <a href="/login" className='text-teal-600 hover:underline'>Login</a>
                </p>
            </div>
        </div>
    )
}

export default SignUp
