import React from "react";
import styles from "./index.module.css";
import GoogleLocationSearch from "../../GoogleLocationSearch";
import { getData } from "country-list";
import {
  Button, 
  Row,
  Col,  
  Form,
  Input,
  Select,
  Space,
  DatePicker,
  InputNumber
} from "antd";
import {  
  LockOutlined,
  UserOutlined
} from "@ant-design/icons";
const { Option } = Select;
const AddUpdateForm = ({mode, onFinish, form, onClose, loading, selectedDOB, onDOBChange}) => {  

    return (
      <Form
          layout="vertical"
          name="control-hooks"
          onFinish={onFinish}
          form={form}
        >
          <Col>
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
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                </Select>
              </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter user name",
                },
              ]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="dob"
              label="Date Of Birth"
              rules={[
                {
                  required: true,
                  message: "Please enter DOB",
                },
              ]}
            >
              <DatePicker
                  onChange={onDOBChange}
                  format={{
                    format: 'YYYY-MM-DD',
                    type: 'mask',
                  }}
              />
            </Form.Item>
          </Col>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                  layout="vertical"
                  label="Weight (kg)"
                  name="weight"                  
                  rules={[
                    {
                      required: true,
                      message: "Please enter weight!",
                    },
                  ]}
                  className={styles.formItemMore}
                >
                  <InputNumber  min={1} step={1}className={styles.marginTop} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                  layout="vertical"
                  label="Height (cm)"
                  name="height"                  
                  rules={[
                    {
                      required: true,
                      message: "Please enter height!",
                    },
                  ]}
                  className={styles.formItemMore}
                >
                  <InputNumber  min={1} step={1}className={styles.marginTop} />
              </Form.Item>
            </Col>
          </Row>
        {mode=="add"?
        (<Col>
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
          </Col>
        ) : null}
          <Col>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please enter pharmacy address",
                },
              ]}
            >
              <GoogleLocationSearch
                customStyles={{
                  width: "350px",
                  height: "36px",
                  border: "1px solid #d9d9d9",
                  padding: "0 11px",
                  borderRadius: "5px",
                }}
                sendLocationInfo={(value) =>
                  form.setFieldsValue({ address: value })
                }
                locationInfo={form.getFieldValue("address") ?? ""}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Please enter phone",
                },
              ]}
            >
              <Input placeholder="Please enter phone" />
            </Form.Item>
          </Col>

          <Col>
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
          </Col>
          {mode=="add" && <Col>
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
            </Col>}
            {mode=="add" && <Col>
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
            </Col>}


          <Col className={styles.btn_container}>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
              {mode === 'add'? "Submit" : "Update"}
              </Button>
            </Space>
          </Col>
        </Form>
    )

}

export default AddUpdateForm;