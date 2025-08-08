import React, { useState } from "react";
import { useLoginUserMutation } from "../../redux/Slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { LoginSetToken } from "../../redux/Slice/tokenSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    if (!validateEmail(email)) {
      return toast.error("Invalid email format");
    }

    try {
      const res = await loginUser({ email, password }).unwrap();
      const token = res?.data?.accessToken;
      const userData = res?.data?.user;

      if (!token) throw new Error("Token missing in response");

      Cookies.set("token", token);
      dispatch(LoginSetToken({ token, data: userData }));
      toast.success("Logged in successfully");
      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_right,_#093028,_#6CC686)] flex items-center justify-center">
      <div className="relative w-[25vw] h-[65vh] max-w-md px-6 py-10 bg-white rounded-lg shadow-2xl z-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Sign In
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="USERNAME"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 py-3 px-4 rounded-sm text-sm  tracking-widest focus:outline-none focus:ring-2 focus:ring-[#4CA1AF]"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 py-3 px-4 rounded-sm text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-[#4CA1AF]"
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-left text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#093028] hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md text-sm font-semibold tracking-wider hover:bg-gray-900 transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
