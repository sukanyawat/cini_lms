import React from "react";
import styles from "./index.module.css";
import {
  Button, 
  Form,
  Input 
} from "antd";

const ApplyForm = ({applyUser, formUser, loading}) => {  

    return (
      <Form
      form={formUser}
      layout="horizontal"
      onFinish={applyUser}
      initialValues={{}}
      labelCol={{ span: 24}}
      wrapperCol={{span: 20}}
    >     
      <Form.Item
      name="email"
      label="Email"
      labelCol={{ span: 24 }}
      wrapperCol={{span: 24 }}
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
      className={styles.formItem}
    >
      <Input type="email" placeholder="Email" />
    </Form.Item>
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "25px",
        }}
      >
        <Button type="primary" style={{ width: "140px" }} htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </Form>
    )

}

export default ApplyForm;