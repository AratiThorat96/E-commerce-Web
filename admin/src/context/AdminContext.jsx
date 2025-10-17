/* eslint-disable react-refresh/only-export-components */
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
// ❌ remove this line
// export const authDataContext = createContext()
// ✅ import the one from AuthContext
import { authDataContext } from './AuthContext'

export const adminDataContext = createContext()

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null)
  const { serverUrl } = useContext(authDataContext)  // ✅ now has value

  const getAdmin = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/getCurrentAdmin", { withCredentials: true })
      setAdminData(result.data)
      console.log(result.data)
    } catch (error) {
      setAdminData(null)
      console.log(error)
    }
  }

  useEffect(() => {
    getAdmin()
  }, [])

  const value = { adminData, setAdminData, getAdmin }

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  )
}

export default AdminContext
