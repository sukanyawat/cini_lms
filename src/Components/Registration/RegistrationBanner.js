import React from "react";
import styles from "./index.module.css";
import { Typography } from "antd";

const RegistrationBanner = () => {
  return (
    <div
      className={styles.bannerContainer}
      style={{
        backgroundImage: `url("assets/loginbanner.jpg")`,
        width: "100%",
      }}
    >
    </div>
  );
};

export default RegistrationBanner;
