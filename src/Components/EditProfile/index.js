import React, { useEffect, useState } from "react";
import { Form, Input, Button, Drawer, Upload, message } from "antd";
import { LockOutlined, UserOutlined, PlusOutlined, MailOutlined, PhoneOutlined, HomeOutlined, IdcardOutlined } from "@ant-design/icons";
import { userChangePassword } from "../../Api/Common/Login";
import { ROUTES_URL } from "../../Api/Constant/Constant";
import { clientPostApiCall } from "../../Api/ApiService/ApiService";


const EditProfile = ({ onClose, open }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [fileList, setFileList] = useState([]);
  const userID = localStorage.getItem('userId')
  const [formUser] = Form.useForm();

  useEffect(() => {
    getUserDetails();
  }, [open])

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await clientPostApiCall(ROUTES_URL.WEB_USER_DETAILS, {}, true);
      // console.log('response', response);
      if (response) {
        setLoading(false);
        formUser.resetFields();
        formUser.setFieldsValue({
          "firstName": response.data?.data?.firstName,
          "lastName": response.data?.data?.lastName,
          "email": response.data?.data?.email,
          "phoneNumber": response.data?.data?.phoneNumber,
          "unitName": response.data?.data?.unitName || null,
          "designation": response.data?.data?.designation || null
        })
        setUser(response?.data?.data);
      }
    } catch (err) {
      setLoading(false);

    } finally {
      setLoading(false);
    }
  }

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Thumnail Image
      </div>
    </button>
  );

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        if (key === 'image' && values[key]) {
          formData.append('profilePicture', values[key].file.originFileObj);
        } else {
          formData.append(key, values[key]);
        }
      }
      setLoading(true);
      const response = await clientPostApiCall(ROUTES_URL.WEB_USER_UPDATE, formData, true);
      // console.log('response', response);
      if (response) {
        console.log('response', response?.data?.data?.profilePicture);
        localStorage.setItem("username", response?.data?.data?.firstName);
        localStorage.setItem("userImage", response?.data?.data?.profilePicture);
        message.success("Profile updated Successfully");
        onClose()
      }
    } catch (err) {
      console.log('err',err);
      message.error("Something went Wrong!");
    }
  }

  return (
    <Drawer title="Edit Profile" width={400} onClose={onClose} open={open}>
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
            name="firstName"
            label="First Name"
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
              type="text"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="First Name"
            />
          </Form.Item>
        </div>
        <div className="mb-2">
          <Form.Item
            name="lastName"
            label="Last Name"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
          >
            <Input
              className="h-10"
              type="text"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last Name"
            />
          </Form.Item>
        </div>
        <div className="mb-2">
          <Form.Item
            name="email"
            label="Email"
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
              disabled={true}
              type="text"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
        </div>
        <div className="mb-2">
          <Form.Item
            name="unitName"
            label="Unit Name"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}

          >
            <Input
              className="h-10"
              type="text"
              prefix={<HomeOutlined className="site-form-item-icon" />}
              placeholder="Unit Name"
            />
          </Form.Item>
        </div>
        <div className="mb-2">
          <Form.Item
            name="designation"
            label="Designation"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
          >
            <Input
              className="h-10"
              type="text"
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              placeholder="Designation"
            />
          </Form.Item>
        </div>
        <div className="mb-2">
          <Form.Item
            name="phoneNumber"
            label="Phone"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}

          >
            <Input
              className="h-10"
              type="text"
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone"
            />
          </Form.Item>
        </div>
        <div className="mb-2">
          <Form.Item
            name="image"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
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

export default EditProfile;
