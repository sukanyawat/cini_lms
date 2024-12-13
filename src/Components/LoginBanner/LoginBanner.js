import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { Typography, message } from "antd";
import { postApiCall } from "../../Api/ApiService/ApiService";
import { ROUTES_URL } from "../../Api/Constant/Constant";
import Cookies from 'js-cookie';

const LoginBanner = ({ setLoading }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if "rememberMe" is true in localStorage
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
    const savedRememberMe = Cookies.get('rememberMe') === 'true';

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
    }
    if (!password.trim()) {
      errors.password = "Password is required";
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
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      const payload = { email, password };
      if (rememberMe) {
        // Store user credentials in localStorage if "Remember Me" is checked
        Cookies.set('email', email);
        Cookies.set('password', password);
        Cookies.set('rememberMe', true);
      } else {
        // Clear localStorage if "Remember Me" is unchecked
        Cookies.remove('email');
        Cookies.remove('password');
        Cookies.remove('rememberMe');
      }

      try {
        const response = await postApiCall(ROUTES_URL.USER_LOGIN, payload);
        console.log('resp', response)
        if (response.data) {
          message.success("Login Success");
          localStorage.setItem("token", response?.data?.data.token);
          localStorage.setItem("username", response?.data?.data.user.firstName);
          localStorage.setItem("userImage", response?.data?.data.user.profilePicture);
          localStorage.setItem("userType", response?.data?.data.user.userType);
          localStorage.setItem("userId", response?.data?.data.user._id);
          navigate("/home");
          window.location.reload();
        }
      } catch (err) {
        console.log('err',err);
        message.error(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
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
            WELCOME BACK
          </Typography.Title>
          <Typography.Paragraph className={styles.loginPrompt}>
            Please login to continue
          </Typography.Paragraph>
          <form onSubmit={handleLogin}>
            <div className={styles.inputContainer}>
              <span className={styles.icon}></span>
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
              <span className={styles.icon}>🔒</span>
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
              <Link to="/forgot-password" className={styles.forgotPassword}>
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
  );
};

export default LoginBanner;
