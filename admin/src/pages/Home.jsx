import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useEffect } from 'react'

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const { serverUrl } = useContext(authDataContext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, {}, { withCredentials: true })
      setTotalProducts(products.data.length)

      const orders = await axios.get(`${serverUrl}/api/order/list`, { withCredentials: true })
      setTotalOrders(orders.data.length)
    } catch (error) {
      console.log("Failed to Fetch counts", error)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <Nav />
      <Sidebar />

      <div className='ml-[72px] md:ml-[220px] min-h-screen pt-[100px] px-[20px] md:px-[40px]'>
        <h1 className='text-[35px] text-[#afe2f2]'>Admin Panel</h1>
        <div className='flex items-center justify-start gap-[30px] md:gap-[50px] flex-col md:flex-row mt-[40px]'>
          <div className='text-[#dcfafd] w-[400px] max-w-full h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-black backdrop-blur-lg md:text-[25px] text-[20px] border-[1px] border-[#969595] text-center px-[20px]'>
            Total No. of Products : <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg flex items-center justify-center border-[1px] border-[#969595]'>{totalProducts}</span>
          </div>

          <div className='text-[#dcfafd] w-[400px] max-w-full h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-black backdrop-blur-lg md:text-[25px] text-[20px] border-[1px] border-[#969595] text-center px-[20px]'>
            Total No. of Orders : <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg flex items-center justify-center border-[1px] border-[#969595]'>{totalOrders}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
