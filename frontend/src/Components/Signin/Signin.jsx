import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../Authentication/UserAuthStore";


const Signin = () => {
    const navigate = useNavigate()

    const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault()  
        if(email.trim().length===0){
            toast.error("Email is requied")
            return
        }
        if(password.trim().length===0){
            toast.error("Password is requied")
            return
        }

        try {
            const res = await axios.post("/api/user/signin",{
                email,
                password
            }) 
            console.log("Logged in",res.data.message)
            toast.success("Login successful!");

            setIsLoggedIn(true)
            navigate("/")
        } catch (error) {
            console.log("Error in login",error)
            toast.error("Invalid email or password!");
        }
        setEmail("")
        setPassword("")
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400">Sign in to continue your journey</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-xl shadow-blue-900/20">
                    <form 
                    onSubmit={handleSubmit}
                    className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pr-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div >
                            <label className="block text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                 value={password}
                                 onChange={(e)=>setPassword(e.target.value)}
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pr-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>



                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg transition-transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none"
                        >
                            Sign In
                        </button>

                        {/* Sign Up Link */}
                        <div className="text-center text-sm text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-blue-400 hover:text-purple-400 transition-colors">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Signin;