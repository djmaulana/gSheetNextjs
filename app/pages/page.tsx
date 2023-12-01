'use client'
import * as React from 'react'
import axios from 'axios'
import { BASE_API_URL } from '@/utils/constans';

interface MyData {
  name: string;
  message: string;
}

export default function page () {
    const [name, setName] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [data, setData] = React.useState<MyData[]>([])
    const wasCalled = React.useRef(false);

    const form = {
        name,
        message
    }

    const handleSubmit = async () => {
      try {
        await fetch(`/api/test`, {
          method: 'POST',
          body: JSON.stringify({form})
        })
      } catch (error) {
        console.error(error)
      }
      loadData()
      setName('')
      setMessage('')
      
    }

    const loadData = async () => {
      try {
        const res = await axios.get(`/api/getData`, {
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        setData(res.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    
    React.useEffect(() => {
      if (wasCalled.current) return
      wasCalled.current = true
      loadData()
    }, [loadData])

    
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='h-1/2 bg-white relative py-10 px-5 mt-5 mx-14 rounded-[25px]'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-black font-semibold '>Message Form</h1>
                <div className='flex flex-row text-black mt-5'>
                    <label className=" text-[12px] block mr-8 text-sm" data-aos='zoom-in'>Name</label>
                    <input name='name' id='name' required value={name} onChange={(e) => setName(e.target.value)} data-aos='zoom-in' type="text" className="w-full text-black border text-[13px] border-gray-400 rounded-[8PX] p-1" />
                </div>
                <div className='flex flex-row text-black mt-2'>
                    <label className=" text-[12px] block mr-3 text-sm" data-aos='zoom-in'>Message</label>
                    <textarea name='message' id='message' value={message} onChange={(e) => setMessage(e.target.value)} required data-aos='zoom-in' className="w-full text-black border text-[13px] border-gray-400 rounded-[8PX] p-2"></textarea>
                </div>
                <button type="submit" data-aos='zoom-in' className="bg-[#823E37] text-sm text-gray-200 py-1 shadow-2xl px-4 mt-5 rounded-full">Submit</button>
            </form>
        </div>
        <div className='text-white mt-10 text-center'>
            <h2>Data from API:</h2>
            <ul>
            {data?.slice().reverse().map((item, index) => (
              <li key={index}>
                <p>Name: {item.name}</p>
                <p>Message: {item.message}</p>
              </li>
            ))}
          </ul>
        </div>
    </main>
  )
}


