import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'

function Nav() {
  let navigate = useNavigate()
  let { serverUrl } = useContext(authDataContext)
  let { getAdmin } = useContext(adminDataContext)

  const LogOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      console.log(result.data)
      getAdmin()
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full h-[70px] bg-[#dcdbdbf8] z-20 fixed top-0 left-0 flex items-center justify-between px-[16px] md:px-[30px] shadow-md shadow-black'>
      <div className='flex items-center justify-start gap-[10px] cursor-pointer min-w-0' onClick={() => navigate("/")}>
        <img src={logo} alt="" className='w-[30px] flex-shrink-0' />
        <h1 className='text-[20px] md:text-[25px] text-[black] font-sans truncate'>
          OneCart
        </h1>
      </div>
      <button className='text-[14px] md:text-[15px] hover:border-[2px] border-[#e9daea] cursor-pointer bg-[#000000ca] py-[10px] px-[16px] md:px-[20px] rounded-2xl text-white' onClick={LogOut}>LogOut</button>
    </div>
  )
}

export default Nav
