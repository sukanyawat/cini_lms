import React, { useState } from "react";
import LoginBanner from "../LoginBanner/LoginBanner";
// import styles from "./index.module.css";
import { Spin, Row, Col } from "antd";

const LoginModule = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Spin spinning={loading}>
          <LoginBanner setLoading={setLoading}/>
    </Spin>
  );
};

export default LoginModule;
