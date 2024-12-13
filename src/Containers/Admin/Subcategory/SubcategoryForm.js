import React, { useEffect, useState } from "react";
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

import { getApiCall } from "../../../Api/ApiService/ApiService";
import { ROUTES_URL } from "../../../Api/Constant/Constant";

const { Option } = Select;

const SubcategoryForm = ({ mode, themeList, onFinish, form, onClose, loading }) => {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        if (mode == 'update' && form.getFieldValue('themeId')) {
            handleThemeChange(form.getFieldValue('themeId'))
        }
    }, [mode])

    const handleThemeChange = async (value) => {
        try {
            const response = await getApiCall(`${ROUTES_URL.CATEGORY_LIST_URL}?themeid=${value}`, true);
            if (response && response.data.ack == 'ok') {
                setCategoryList(response?.data.data);
            }
        } catch (err) {
            console.log('Error => ', err);
        }
    }

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
                        onChange={(value) => handleThemeChange(value)}
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
                    name="parentId"
                    label="Category"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select category"
                        allowClear
                    >
                        {
                            categoryList.length > 0 && categoryList.map((theme, i) => (
                                <Option value={theme._id} key={i}> {theme.categoryName} </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="categoryName"
                    label="Subcategory Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter subcategory name",
                        },
                    ]}
                >
                    <Input placeholder="Please enter subcategory name" />
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

export default SubcategoryForm;