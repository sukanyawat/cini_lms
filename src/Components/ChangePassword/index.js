import React from "react";
import { Form, Input, Button, Drawer, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { userChangePassword } from "../../Api/Common/Login";


const ChangePassword = ({ onClose, open }) => {
    const userID = localStorage.getItem('userId')
    const [formUser] = Form.useForm();
    
    const onFinish=async(value)=>{
        try{
        const payload = {
            "user_id":userID ,
            "old_password": value.currentPassword,
            "new_password": value.newPassword
        }
       const resp=await userChangePassword(payload)
       if (resp) {
        message.success("Password change Success");
      }
    } catch (err) {
      message.error("Something went Wrong!");
    } 
    }

  return (
    <Drawer title="Change Password" width={400} onClose={onClose} open={open}>
        <Form
        form={formUser}
        layout="horizontal"
        onFinish={onFinish}
        
        initialValues={{}}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 20,
        }}
      >
        <div className="mb-2">
        <Form.Item
                name="currentPassword"
                label="Current Password"
                labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                ]}
              >
                <Input
                  className="h-10"
                  type="password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
        </div>
       <div className="mb-2">
              <Form.Item
                name="newPassword"
                label="New Password"
                labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                ]}
              >
                <Input
                  className="h-10"
                  type="password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="New Password"
                />
              </Form.Item>
            </div>
            <div className="mb-2">
              <Form.Item
                name="conformPassword"
                label="Confirm Password"
                dependencies={["newPassword"]}
                labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
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
                  className="h-10"
                  type="password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Confirm password"
                />
              </Form.Item>
            </div>
   

  
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "25px",
          }}
        >
          <Button type="primary" style={{ width: "140px" }} htmlType="submit" >
            Save
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default ChangePassword;
