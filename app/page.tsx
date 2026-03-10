"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

interface taskProps {
  title: string;
  description: string
  status: string;
  _id: string
}



const Homepage = () => {

  const [task, settask ] = useState<taskProps[]>([])
  const [loading, setLoading] = useState(false)
  const [statusL, setstatusL] = useState<string | null>(null)
  const router = useRouter()
  useEffect(()=>{
    setLoading(true)
    const fetchPost = async()=>{
        await axios.get(`http://localhost:5000/api/v2/tasks/tasks`,{
          withCredentials: true, 
        }).then((res)=>{
          console.log('the res', res)
            settask(res.data.tasks)
            setLoading(false)
        }).catch((err)=>{
            setLoading(false)
            console.error('Error in fetching posts', err.response.data.message)
        })
    }
    fetchPost()

  }, [])

  const handleStatus =async (id: string) =>{
      try {
        setstatusL(id)
        await axios.put(`http://localhost:5000/api/v2/tasks/task/${id}`,{} ,{withCredentials: true})
        settask((prev) => prev.map((t)=> (
          t._id === id ? {...t, status: "completed" } : t
        )))
        setstatusL(null)
      } catch (err) {
        console.error(err)
        setstatusL(null)
      }
  }

  const handleDelete = async (id: string)=>{
      try {
        await axios.delete(`http://localhost:5000/api/v2/tasks/task/${id}`, {withCredentials: true})
        settask((prev) => prev.filter((p) => p._id !== id))
      } catch (error) {
        console.error(error)
      }
  }

  if(loading){
    return(
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    )
  }



  return (
    <div className="flex items-center justify-center h-screen">
      <div className='flex flex-col w-[450px] h-[500px] mx-auto shadow-sm shadow-blue-300 rounded-2xl p-4'>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold ">Task Manager</h2>
          <div className="flex gap-3 items-center">
            <button className="px-2 py-1 text-white bg-blue-400 rounded-md cursor-pointer mt-3 text-sm" onClick={()=> router.push('/form')}>Add</button>
          </div> 
        </div>
        {task.map((t, index)=>(
          <div className="flex flex-col mb-2" key={index}>
            <div className="flex flex-col border border-gray-300 px-2 gap-8 py-1 rounded-md ">
              <div className="flex items-center justify-between">
                <div className="flex flex-col justify-between">
                  <h2 className="font-semibold text-sm">{t.title}</h2>
                  <p className="text-sm justify-center">{t.description}</p>
                </div>
                <button className="px-2 py-1 text-white bg-red-400 rounded-md cursor-pointer text-sm" onClick={()=> handleDelete(t._id)}>Delete</button>
              </div>
              <div className="flex items-center justify-between  gap-3">
                <p className={`text-sm  ${t.status === "pending" ? "text-red-500" : "text-green-500" }`}>{t.status}</p>
                <button className="text-sm  bg-green-400 text-white cursor-pointer px-2 py-1 rounded-md" onClick={()=>handleStatus(t._id)} >{statusL === t._id? "loading..." :"Submit"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Homepage