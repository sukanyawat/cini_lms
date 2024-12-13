import React, { useState } from "react";
import RegistrationBanner from "../Registration/RegistrationBanner";
import RegistrationForm from "../Registration/RegistrationForm";
import { Spin, Col, Row } from "antd";
import "./index.module.css";

const RegistrationModule = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={12}>
          <RegistrationBanner />
        </Col>
        <Col span={12} className="itemCenter">
          <RegistrationForm setLoading={setLoading} />
        </Col>
      </Row>
    </Spin>
  );
};

export default RegistrationModule;
