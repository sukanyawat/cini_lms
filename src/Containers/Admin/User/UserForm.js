import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import {
    Button,
    Row,
    Col,
    Form,
    Input,
    Select,
    Space,
    Upload
} from "antd";
import {
    LockOutlined,
    UserOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { config } from "../../../Config";


const UserForm = ({ mode, onFinish, form, onClose, loading }) => {
    // console.log(form.getFieldValue());
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if(form.getFieldValue('profilePicture')) {
            setFileList([config.API_BASE_URL+form.getFieldValue('profilePicture')])
            
        }
    }, [])

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

    return (
        <Form
            layout="vertical"
            name="control-hooks"
            onFinish={onFinish}
            form={form}
        >
            <Col>
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter first name",
                        },
                    ]}
                >
                    <Input placeholder="Please enter first name" />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter last name",
                        },
                    ]}
                >
                    <Input placeholder="Please enter last name" />
                </Form.Item>
            </Col>
            <Col>
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
                        placeholder="Please enter email"
                    />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="unitName"
                    label="Unit Name"
                    rules={[
                        {
                            required: true,
                            message: "Unit name is required!",
                        }
                    ]}
                >
                    <Input
                        placeholder="Please enter unit name"
                    />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="designation"
                    label="Designation"
                    rules={[
                        {
                            required: true,
                            message: "Designation is required!",
                        }
                    ]}
                >
                    <Input
                        placeholder="Please enter designation"
                    />
                </Form.Item>
            </Col>
            {mode == "add" ?
            <>
            <Col>
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
                        placeholder="Please enter password"
                    />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="confirmPassword"
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
                        placeholder="Please enter confirm password"
                    />
                </Form.Item>
            </Col>
            </>
            : null}
            
            <Col>
                <Form.Item
                    name="phoneNumber"
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

            <Col className="mb-6">
                <Form.Item
                    name="profilePicture"
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
            </Col>


            <Col className={styles.btn_container}>
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {mode === 'add' ? "Submit" : "Update"}
                    </Button>
                </Space>
            </Col>
        </Form>
    )

}

export default UserForm;