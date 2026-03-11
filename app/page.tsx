"use client"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
const API = process.env.NEXT_PUBLIC_API_URL;



const LoginPage = () => {
    const [formDData, setFormData ] = useState({
        email: "",
        password: "",
    })
    const [Loading, setLoading ] = useState(false)
    const [token, setToken] = useState(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        console.log(formDData)
        try {
            setLoading(true)
            const res = await axios.post(`${API}/api/v2/auths/login`, formDData, { withCredentials: true })
            const token = res.data.token
            setToken(token)
            console.log("login token", token)
            localStorage.setItem('token', token)  
            router.push("/home")        
        } catch (error) {
            console.log('Error during login:', error)
            return null
        }finally{
            setLoading(false)
        }
    }


  return (
    <div className='w-full h-screen flex items-center justify-center overflow-y'>
        <div className="flex flex-col items-center  justify-center  ">
                <h2 className="lg:text-[38px] md:text-3xl text-xl text-center font-bold ">Log in to your account</h2>
                <p className="text-[#737373] text-base mt-3 text-center">Please provide your registered email and password to continue.</p>
                <div className="flex w-full justify-center items-center flex-col">
                    <form className="w-full mt-8 lg:mt-14" onSubmit={handleSubmit} >
                        <div className="w-full flex flex-col justify-between ">
                            <label className="mb-5 font-semibold">
                                Email address 
                            </label>
                            <input type="email" value={formDData.email} onChange={(e) => setFormData({...formDData, email: e.target.value})} className="border border-black rounded-md w-full p-2 lg:p-4 placeholder:text-sm text-base" required autoComplete="email" placeholder="Enter your email address" />
                        </div>
                        <div className="w-full flex flex-col justify-between mt-4">
                            <label className="mb-5 font-semibold">
                                Password 
                            </label>
                            <input type="password" value={formDData.password} onChange={(e) => setFormData({...formDData, password: e.target.value})} className="border border-black rounded-md w-full p-2 lg:p-4 placeholder:text-sm text-base" required autoComplete="email" placeholder="Enter your password" />
                        </div>
                        <div className="flex items-center justify-between gap-3 mt-5">
                            <div className="flex items-center justify-between gap-3">
                                <input type="checkbox" name="remember-me" className="cursor-pointer"/>
                                <label > Remember for 30 days </label>
                            </div>
                            <a href="#" className="text-base text-blue-500 underline">Forget password</a>
                        </div>
                        <button type="submit" className="px-3 py-2 text-white bg-blue-400 rounded-md w-28 mt-3"> {Loading ? "loading..." : "login"}</button>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default LoginPage