import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { getData } from "country-list";
import { Input, Form, message, Radio, Select, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import { userRegistration } from "../../Api/Common/Login";
const { Option } = Select;

const RegistrationForm = ({ setLoading }) => {
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState("doctor");
  const [formUser] = Form.useForm();

  const submitUser = () => {
    formUser
      .validateFields()
      .then((values) => handleSignUp(values))
      .catch(() => {});
  };

  const handleSignUp = async (values) => {
    try {
      setLoading(true);
      const payload = {
        user_data: JSON.stringify({
          gender: values.gender,
          name: values.name,
          phone: values.phone,
          country_code: values.country,
          email: values.email,
          password: values.password,
          role_id:
            userRole === "doctor"
              ? "285086bf-bbac-4a4c-bfa9-b068d4e72eeb"
              : "9597ee8c-a015-41c3-8346-1881bce823ff",
        }),
      };
      const finalFormData = new FormData();
      for (let key in payload) {
        finalFormData.append(key, payload[key]);
      }

      const response = await userRegistration(finalFormData);
      if (response) {
        message.success("Registration Success");
        setLoading(false);
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      message.error("Something went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleUserRole = (e) => {
    setUserRole(e.target.value);
  };
  return (
    <>
      <div
        style={{ width: "100%" }}
        className="relative flex flex-col justify-center min-h-screen overflow-hidden"
      >
        <div className="w-full p-2 m-auto bg-white rounded-md lg:max-w-xl">
          <div className="flex flex-col justify-center items-center pb-3">
            <Typography style={{ fontSize: "20px", fontWeight: "600" }}>
              Signup
            </Typography>
          </div>
          <Form
            form={formUser}
            layout="vertical"
            initialValues={{}}
            labelCol={24}
            wrapperCol={24}
          >
            <div>
              <Radio.Group onChange={handleUserRole} value={userRole}>
                <Radio value="doctor">Doctor</Radio>
                <Radio value="patient">Patient</Radio>
              </Radio.Group>
            </div>

            <div>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select a gender"
                  // onChange={onGenderChange}
                  allowClear
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Name"
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="country"
                label="Country"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Select a country" allowClear showSearch>
                  {getData().map((country) => (
                    <Option value={country.code}>{country.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="phone"
                label="Phone Number with country code"
                rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="Phone Number"
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Email is required!",
                  },
                  {
                    type: "email",
                    message: "Invalid email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Emain"
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                ]}
              >
                <Input
                  type="password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="password2"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input
                  type="password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Confirm password"
                />
              </Form.Item>
            </div>

            <div className="mt-6">
              <button
                onClick={() => submitUser()}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)] focus:outline-none focus:bg-[var(--color-primary)]"
              >
                Sign Up
              </button>
              <div className={styles.normal_text}>
                Don't have an account?{" "}
                <a
                  onClick={() => {
                    navigate("/");
                  }}
                  className="text-blue-500"
                >
                  Login
                </a>{" "}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
