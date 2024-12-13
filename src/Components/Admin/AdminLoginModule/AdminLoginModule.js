import React, { useState, useEffect } from "react";
import LoginBanner from "../../LoginBanner/LoginBanner";
import AdminLoginForm from "../AdminLoginForm/AdminLoginForm";
import { Spin, Row, Col, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { userLogin } from "../../../Api/Common/Login";
import Cookies from 'js-cookie';


const AdminLoginModule = () => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const [loading, setLoading] = useState(false);
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

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
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
      console.log('err',err);
      message.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    if(adminToken){
      navigate("/admin/dashboard");
    }

  },[adminToken]);
  
  return (
    <Spin spinning={loading}>
      <div className={styles.bannerContainer}>
        <div
          className={styles.leftSection}
          style={{
            backgroundImage: `url("assets/Main-Background.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className={styles.contentWrapper}>
            <div className={styles.blurredTextBackground}>
              <Typography.Title level={2} className={styles.textTitle}>
                LOREM IPSUM
              </Typography.Title>
              <Typography.Paragraph className={styles.textDescription}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </Typography.Paragraph>
            </div>
            <img
              src={"assets/pretty-woman-reading-book.png"}
              alt="woman reading"
              className={styles.womanImage}
            />
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.loginForm}>
            <img src={"assets/cini-login.png"} alt="CINI Logo" className={styles.logo} />
            <Typography.Title className={styles.welcomeText}>
              Admin Login
            </Typography.Title>
            <form onSubmit={handleLogin}>
              <div className={styles.inputContainer}>
                <span className={styles.icon}><img src={"assets/user-icon.png"} alt="user Logo" /></span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email..."
                  value={email}
                  onChange={handleInputChange}
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
              </div>
              <div className={styles.inputContainer}>
                <span className={styles.icon}><img src={"assets/email-icon.png"} alt="user Logo" /></span>
                <input
                  type="password"
                  name="password"
                  placeholder="*********"
                  value={password}
                  onChange={handleInputChange}
                />
                {errors.password && <span className="text-red-500">{errors.password}</span>}
              </div>
              <div className={styles.rememberSection}>
                <div style={{ display: 'flex' }}>
                  <input type="checkbox" checked={rememberMe} onChange={handleCheckboxChange} />
                  <span>Remember me</span>
                </div>
                <Link to="/admin-forgot-password" className={styles.forgotPassword}>
                  Forgot Password?
                </Link>
              </div>
              <button type="submit" className={styles.loginButton}>
                Log In
              </button>
            </form>
          </div>
        </div>

      </div>

    </Spin>
  );
};

export default AdminLoginModule;
