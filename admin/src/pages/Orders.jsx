import React from 'react'
import axios from 'axios'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import { useEffect } from 'react'
import { SiEbox } from "react-icons/si";

function Orders() {
  let [orders, setOrders] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden'>
      <Nav />
      <Sidebar />
      <div className='ml-[72px] md:ml-[220px] mt-[70px] flex flex-col gap-[30px] py-[50px] px-[16px] md:px-[30px]'>
        <div className='w-full max-w-[400px] min-h-[50px] text-[28px] md:text-[40px] mb-[20px] text-white'>All Orders List</div>

        {
          orders.map((order, index) => (
            <div key={index} className='w-full max-w-[1100px] bg-slate-600 rounded-xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-[10px] md:px-[20px] gap-[20px]'>
              <SiEbox className='w-[60px] h-[60px] text-[black] p-[5px] rounded-lg bg-[white] flex-shrink-0' />

              <div className='flex-1 min-w-0'>
                <div className='flex items-start justify-center flex-col gap-[5px] text-[16px] text-[#56dbfc] break-words'>
                  {
                    order.items.map((item, itemIndex) => {
                      if (itemIndex === order.items.length - 1) {
                        return <p key={itemIndex}>{item.name.toUpperCase()}  *  {item.quantity} <span>{item.size}</span></p>
                      } else {
                        return <p key={itemIndex}>{item.name.toUpperCase()}  *  {item.quantity} <span>{item.size}</span>,</p>
                      }
                    })
                  }
                </div>
                <div className='text-[15px] text-green-100 break-words'>
                  <p>{order.address.firstName + " " + order.address.lastName}</p>
                  <p>{order.address.street + ", " + order.address.country + " ," + order.address.pinCode}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
              <div className='text-[15px] text-green-100 lg:min-w-[180px]'>
                <p>Items : {order.items.length}</p>
                <p>Method : {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                <p className='text-[20px] text-[white]'> Rs {order.amount}</p>
              </div>
              <select value={order.status} className='px-[5px] py-[10px] bg-slate-500 rounded-lg border-[1px] border-[#96eef3] w-full lg:w-auto max-w-[220px]' onChange={(e) => statusHandler(e, order._id)}>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
