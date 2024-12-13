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

const ThemeForm = ({ mode, onFinish, form, onClose, loading }) => {

    return (
        <Form
            layout="vertical"
            name="control-hooks"
            onFinish={onFinish}
            form={form}
        >
            <Col>
                <Form.Item
                    name="themeTitle"
                    label="Theme Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter theme name",
                        },
                    ]}
                >
                    <Input placeholder="Please enter theme name" />
                </Form.Item>
            </Col>
            {/* <Col>
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
            </Col> */}
            {mode !== "add" ?
            (<Col>
                <Form.Item
                    name="isActive"
                    valuePropName="checked"
                >
                    <Checkbox>Active</Checkbox>
                </Form.Item>
            </Col>
            ) : null}


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

export default ThemeForm;