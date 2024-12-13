import React from "react";
import styles from "./index.module.css";
import {
    Button,
    Row,
    Col,
    Form,
    Input,
    Space,
    Checkbox
} from "antd";

const UserRequestForm = ({ onFinish, form, onClose, loading }) => {

    return (
        <Form
            layout="vertical"
            name="control-hooks"
            onFinish={onFinish}
            form={form}
        >
            <Col>
                <Form.Item
                    name="adminComment"
                    label="Admin Comment"
                    rules={[
                        {
                            required: true,
                            message: "Please enter comment",
                        },
                    ]}
                >
                    <Input placeholder="Please enter your commnent" />
                </Form.Item>
            </Col>


            <Col className={styles.btn_container}>
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Reply
                    </Button>
                </Space>
            </Col>
        </Form>
    )

}

export default UserRequestForm;