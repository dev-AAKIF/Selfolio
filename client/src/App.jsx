import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login.jsx";
import Home from "./Pages/Home/Home.jsx";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { LoginSetToken } from "./redux/Slice/tokenSlice.js";

function App() {
    const dispatch = useDispatch();
    
    const token =
      useSelector((state) => state.auth?.token) ;

      useEffect(() => {
        const cookieToken = Cookies.get("token");
          if (cookieToken && !token) {
            dispatch(LoginSetToken({ token: cookieToken }));
          }
      }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route goes to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Page: Redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/home" />}
        />

        {/* Signup Page: Redirect to dashboard if already logged in */}
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/home" />}
        />

        {/* Dashboard: Protected route */}
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        {/* Catch-all route redirects to /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
