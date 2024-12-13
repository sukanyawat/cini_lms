import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";

import AdminLogin from "../../Pages/Admin/AdminLogin/AdminLogin";
import Login from "../../Pages/Login/Login";
import ForgotPassword from "../../Components/ForgotPassword/ForgotPassword";
import AdminForgotPassword from "../../Components/Admin/AdminForgotPassword/ForgotPassword";
import Registration from "../../Pages/Registration/Registration";

const PublicRoutes = () => {

  return (
        <>
          <Route path="/" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/admin-forgot-password" element={<AdminForgotPassword />}></Route>
          <Route path="/admin" element={<AdminLogin />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
        </>
      );
};

export default PublicRoutes;
