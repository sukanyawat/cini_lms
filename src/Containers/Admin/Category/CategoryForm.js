import React from "react";
import styles from "./index.module.css";
import {
    Button,
    Row,
    Col,
    Form,
    Input,
    Space,
    Checkbox,
    Select
} from "antd";
const { Option } = Select;

const CategoryForm = ({ mode, themeList, onFinish, form, onClose, loading }) => {

    return (
        <Form
            layout="vertical"
            name="control-hooks"
            onFinish={onFinish}
            form={form}
        >
            <Col>
                <Form.Item
                    name="themeId"
                    label="Theme"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select theme"
                        allowClear
                    >
                        {
                            themeList.length > 0 && themeList.map((theme, i) => (
                                <Option value={theme._id} key={i}> {theme.themeTitle} </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="categoryName"
                    label="Category Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter category name",
                        },
                    ]}
                >
                    <Input placeholder="Please enter category name" />
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

export default CategoryForm;