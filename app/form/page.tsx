"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })
    const router = useRouter()

    const handleTask = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            setLoading(true)
            axios.post(`http://localhost:5000/api/v2/tasks/task`, formData, {withCredentials: true})
            setLoading(false)
            router.push("/")
        } catch (error) {
            setLoading(false)
        }
    }


  return (
    <div className="flex items-center justify-center h-screen w-full">
        <div className=" shadow-sm shadow-gray-500 rounded-2xl px-3 gap-5 py-2 mx-auto">
            <h2 className="text-xl font-bold">Create a task </h2>
            <form className='flex flex-col gap-3' onSubmit={handleTask}>
                <div className="flex gap-3">
                    <label > Title</label>
                    <input type="text" value={formData.title} onChange={(e)=>setFormData({...formData, title: e.target.value})} className='border-b outline-none ' />
                </div>
                <div className="flex flex-col gap-3">
                    <label > Description</label>
                    <textarea name="" value={formData.description} onChange={(e)=> setFormData({...formData, description: e.target.value})} className='border rounded-lg px-3 py-2 border-gray-400 h-24 focus:border-black' />
                </div>
                <button type='submit' className='px-2 py-1 rounded-md bg-blue-400 text-white mt-5 cursor-pointer'>Create</button>
            </form>
        </div>
    </div>
  )
}

export default page