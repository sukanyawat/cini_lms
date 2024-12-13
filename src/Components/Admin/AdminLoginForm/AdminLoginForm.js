import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { ROUTES_URL } from "../../../Api/Constant/Constant";
import { Input, Spin, Typography, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { userLogin } from "../../../Api/Common/Login";
import Cookies from 'js-cookie';

const AdminLoginForm = ({ setLoading }) => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const adminToken = localStorage.getItem('admin-token');

  useEffect(() => {
    // Check if "rememberMe" is true in localStorage
    const savedEmail = Cookies.get('aemail');
    const savedPassword = Cookies.get('apassword');
    const savedRememberMe = Cookies.get('arememberMe') === 'true';

    if (savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(savedRememberMe);
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    } else {
      delete errors.email;
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else {
      delete errors.password;
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const formErrors = validateForm();
      if (Object.keys(formErrors).length === 0) {
        setLoading(true);
        const payload = {
          email: email,
          password: password,
        };

        if (rememberMe) {
          // Store user credentials in localStorage if "Remember Me" is checked
          Cookies.set('aemail', email);
          Cookies.set('apassword', password);
          Cookies.set('arememberMe', true);
        } else {
          // Clear localStorage if "Remember Me" is unchecked
          Cookies.remove('aemail');
          Cookies.remove('apassword');
          Cookies.remove('arememberMe');
        }

        const response = await userLogin(payload);
        console.log('response',response);
        if (response.data) {
          message.success("Login Success");

          localStorage.setItem("admin-token", response?.data?.data.token);
          localStorage.setItem("userType", response?.data?.data.user.userType);
          localStorage.setItem("userId", response?.data?.data.user._id);
          
          setLoading(false);
          navigate("/admin/dashboard");
          window.location.reload();
          // if (response?.data?.data.user.userType === "customer") {
          //   navigate("/home");
          //   window.location.reload();
          // } else if (response?.data?.data.user.userType === "admin") {
          //   navigate("/admin/dashboard");
          //   window.location.reload();
          // } else {
          //   navigate("/pagenotfound");
          // }
        }
      } else {
        setErrors(formErrors);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      message.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    if(adminToken){
      navigate("/admin/dashboard");
    }

  },[adminToken])

  return (
    <>
      <div
        style={{ width: "100%" }}
        className="relative flex flex-col justify-center min-h-screen overflow-hidden"
      >
        <div className="w-full p-6 m-auto bg-white rounded-md lg:max-w-xl">
            <div
              // className={styles.bannerContainer}
            >
              <img src="/assets/cini-login.png" alt="logo" style={{margin:"0 auto"}} />
            </div> 

          <div className="flex flex-col justify-center items-center pb-3">
            <Typography style={{ fontSize: "20px", fontWeight: "600" }}>
              Admin Login
            </Typography>
          </div>
          <form className="mt-4">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <Input
                placeholder="Enter Email"
                type="email"
                name="email"
                prefix={<UserOutlined className={styles.login_img} />}
                value={email}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-indigo-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 flex"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <Input.Password
                placeholder="Enter Password"
                type="password"
                name="password"
                value={password}
                prefix={<LockOutlined className={styles.login_img} />}
                onChange={handleInputChange}
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone className={styles.login_img} />
                  ) : (
                    <EyeInvisibleOutlined className={styles.login_img} />
                  )
                }
                className="block w-full px-4 py-2 mt-2 text-indigo-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 flex"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </div>
            {/* <a
              href="#"
              className="body-font font-ubuntu text-xs text-[var(--color-primary)] hover:underline flex justify-end"
            >
              Forget Password?
            </a> */}
            <div className="mt-6">
              <button
                onClick={handleLogin}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)] focus:outline-none focus:bg-[var(--color-primary)]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLoginForm;
