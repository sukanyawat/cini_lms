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

const RackForm = ({ mode, onFinish, form, onClose, loading }) => {

    return (
        <Form
            layout="vertical"
            name="control-hooks"
            onFinish={onFinish}
            form={form}
        >
            {/* <Col>
                <Form.Item
                    name="rackName"
                    label="Rack Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter rack name",
                        },
                    ]}
                >
                    <Input placeholder="Please enter rack name" />
                </Form.Item>
            </Col> */}
            <Col>
                <Form.Item
                    name="roomName"
                    label="Room Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter room name",
                        },
                    ]}
                >
                    <Input placeholder="Please enter room name" />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="cabinetNumber"
                    label="Cabinet Number"
                    rules={[
                        {
                            required: true,
                            message: "Please enter cabinet number",
                        },
                    ]}
                >
                    <Input type="number" placeholder="Please enter cabinet number" />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="rackNumber"
                    label="Rack Number"
                    rules={[
                        {
                            required: true,
                            message: "Please enter rack number",
                        },
                    ]}
                >
                    <Input type="number" placeholder="Please enter rack number" />
                </Form.Item>
            </Col>
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

export default RackForm;