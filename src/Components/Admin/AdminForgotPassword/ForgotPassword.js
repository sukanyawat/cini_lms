import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { Typography, message } from "antd";
import { postApiCall } from "../../../Api/ApiService/ApiService";
import { ROUTES_URL } from "../../../Api/Constant/Constant";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

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
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }else if (name === "otp") {
      setOtp(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrors({ ...errors, email: "Email is required" });
      return
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ ...errors, email: "Email is invalid" });
      return
    }
    try {
      setLoading(true);
      if (!isEmailVerified) {
        const payload = { email };
        const response = await postApiCall(ROUTES_URL.WEB_FORGOT_PASSWORD, payload);
        console.log('resp', response)
        if (response.data) {
          setIsEmailVerified(true);
        }
      } else {
        const payload = { email, otp, password, confirmPassword };
        const response = await postApiCall(ROUTES_URL.WEB_SET_PASSWORD, payload);
        console.log('resp', response)
        if (response.data) {
          message.success(response.data.message);
          navigate("/admin");
        }

      }
    } catch (err) {
      setLoading(false);
      console.log('err', err);
      message.error(err.response?.data?.message);
    } finally {
      setLoading(false);
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
            Forgot Password
          </Typography.Title>
          {/* <Typography.Paragraph className={styles.loginPrompt}>
            Please login to continue
          </Typography.Paragraph> */}
          <form onSubmit={handleLogin}>
            <div className={styles.inputContainer}>
              <span className={styles.icon}><img src={"assets/email-icon.png"} alt="user Logo" /></span>
              <input
                type="email"
                name="email"
                placeholder="Enter email..."
                value={email}
                disabled={isEmailVerified}
                onChange={handleInputChange}
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
            {
              isEmailVerified ? <>
                <div className={styles.inputContainer}>
                  {/* <span className={styles.icon}><img src={"assets/password_icon.png"} alt="user Logo" /></span> */}
                  <input
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    value={otp}
                    onChange={handleInputChange}
                  />
                  {errors.otp && <span className="text-red-500">{errors.otp}</span>}
                </div>
                <div className={styles.inputContainer}>
                  <span className={styles.icon}><img src={"assets/password_icon.png"} alt="user Logo" /></span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  {errors.password && <span className="text-red-500">{errors.password}</span>}
                </div>
                <div className={styles.inputContainer}>
                  <span className={styles.icon}><img src={"assets/password_icon.png"} alt="user Logo" /></span>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleInputChange}
                  />
                  {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
                </div>
              </> : null
            }


            <button type="submit" className={styles.loginButton}>
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
