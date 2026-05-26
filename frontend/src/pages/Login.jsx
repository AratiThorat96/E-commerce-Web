import React, { useContext, useState } from 'react';
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import google from '../assets/googlelogo.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import toast from 'react-hot-toast';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      await getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
    }
  };

  const googlelogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name, email },
        { withCredentials: true }
      );
      toast.success("Google login success:", result.data);
      await getCurrentUser();
      navigate("/");
    } catch (error) {
      toast.error("Google login error:", error.response?.data || error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start pb-[30px]">
      <div className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer" onClick={() => navigate("/")}>
        <img className="w-[40px]" src={Logo} alt="logo" />
        <span className="text-[22px] font-sans">OneCart</span>
      </div>

      <div className="w-full h-[100px] flex flex-col items-center justify-center gap-[10px]">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px]">Welcome to OneCart, place your order</span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]">
          <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer" onClick={googlelogin}>
            <img src={google} alt="google" className="w-[20px]" />
            Login with Google
          </div>

          <div className="w-full h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div> OR <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          <div className="w-[90%] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="email"
              className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type={show ? "text" : "password"}
              className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {!show ? (
              <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={() => setShow(prev => !prev)} />
            ) : (
              <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={() => setShow(prev => !prev)} />
            )}

            <button type="submit" className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">
              Login
            </button>

            <p className="flex gap-[10px]">
              {"Don't have an account?"}
              <span className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer" onClick={() => navigate("/signup")}>
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
