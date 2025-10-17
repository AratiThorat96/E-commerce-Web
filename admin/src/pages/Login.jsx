import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/AdminLogin",
        { email, password },
        { withCredentials: true }
      );
  

      if (res.status === 200) {
        toast.success("Admin login successful");
        navigate("/");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div
        className="w-full flex items-center justify-start py-4 px-6 md:px-10 gap-2 absolute top-0 left-0 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-8 md:w-10" src={logo} alt="logo" />
        <h1 className="text-lg md:text-xl font-sans">OneCart Admin</h1>
      </div>

      {/* Title */}
      <div className="w-full flex flex-col items-center justify-center text-center my-6">
        <span className="text-xl md:text-3xl font-semibold mb-2">Admin Login</span>
        <span className="text-sm md:text-base text-gray-400">Enter your admin credentials</span>
      </div>

      {/* Card */}
      <div className="w-full max-w-md p-6 bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(96,96,245,0.4)]">
        <form onSubmit={handleAdminLogin} className="flex flex-col items-center justify-center gap-6">
          {/* Inputs */}
          <div className="w-full flex flex-col items-center gap-4 relative">
            <input
              type="email"
              className="w-full h-12 border-2 border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold outline-none focus:border-[#6060f5] transition-colors"
              placeholder="Admin Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <div className="w-full relative">
              <input
                type={show ? "text" : "password"}
                className="w-full h-12 border-2 border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold pr-12 outline-none focus:border-[#6060f5] transition-colors"
                placeholder="Admin Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {/* Show/Hide password */}
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors"
                onClick={() => setShow((prev) => !prev)}
              >
                {!show ? <IoEyeOutline size={20} /> : <IoEye size={20} />}
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-sm font-semibold text-center mt-2">{error}</p>
            )}

            <button
              type="submit"
              className={`w-full h-12 rounded-lg flex items-center justify-center mt-4 text-base md:text-lg font-semibold transition-all ${
                loading
                  ? "bg-[#4c4cd9] cursor-not-allowed"
                  : "bg-[#6060f5] hover:bg-[#4c4cd9]"
              }`}
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading className="animate-spin text-white text-xl" />
              ) : (
                "Admin Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;