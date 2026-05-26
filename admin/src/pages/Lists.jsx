import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Lists() {
  let [list, setList] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) {
        fetchList()
      } else {
        console.log("Failed to remove Product")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden'>
      <Nav />
      <Sidebar />
      <div className='ml-[72px] md:ml-[220px] mt-[70px] flex flex-col gap-[30px] py-[50px] px-[16px] md:px-[30px]'>
        <div className='w-full max-w-[400px] min-h-[50px] text-[28px] md:text-[40px] mb-[20px] text-white'> All Listed Products</div>

        {
          list?.length > 0 ? (
            list.map((item, index) => (
              <div className='w-full max-w-[1100px] md:min-h-[120px] min-h-[90px] bg-slate-600 rounded-xl flex items-center justify-start gap-[8px] md:gap-[30px] p-[10px] md:px-[30px]' key={index}>
                <img src={item.image1} className='w-[80px] md:w-[120px] h-[70px] md:h-[90%] rounded-lg object-cover flex-shrink-0' alt="" />
                <div className='flex-1 min-w-0 h-[80%] flex flex-col items-start justify-center gap-[2px]'>
                  <div className='w-full text-[15px] md:text-[20px] text-[#bef0f3] truncate'>{item.name}</div>
                  <div className='md:text-[17px] text-[15px] text-[#bef3da]'>{item.category}</div>
                  <div className='md:text-[17px] text-[15px] text-[#bef3da]'>Rs {item.price}</div>
                </div>
                <div className='w-[35px] md:w-[50px] h-full bg-transparent flex items-center justify-center flex-shrink-0'>
                  <span className='w-[35px] min-h-[35px] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer hover:text-red-300' onClick={() => removeList(item._id)}> X</span>
                </div>
              </div>
            ))
          )
            : (
              <div className='text-white text-lg'>No products available.</div>
            )
        }
      </div>
    </div>
  )
}

export default Lists
