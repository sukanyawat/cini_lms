import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import {
    Button,
    Col,
    Form,
    Input,
    Space,
    Checkbox,
    Select,
    Upload,
    DatePicker,
    message
} from "antd";
import { PlusOutlined, } from '@ant-design/icons';

import { getApiCall } from "../../../Api/ApiService/ApiService";
import { ROUTES_URL } from "../../../Api/Constant/Constant";

const { Option } = Select;

const BookForm = ({ mode, onFinish, form, themeList, rackList, onClose, loading }) => {
    const [fileList, setFileList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setSubcategoryList] = useState([]);

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    useEffect(() => {
        if (mode == 'update') {
            console.log(form.getFieldValue('themeId'));
            console.log(form.getFieldValue('categoryId'));
            handleThemeChange(form.getFieldValue('themeId'))
            handleCategoryChange(form.getFieldValue('categoryId'))
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

    const handleCategoryChange = async (value) => {
        try {
            const response = await getApiCall(`${ROUTES_URL.SUBCATEGORY_LIST_URL}?categoryid=${value}`, true);
            if (response && response.data.ack == 'ok') {
                setSubcategoryList(response?.data.data);
            }
        } catch (err) {
            console.log('Error => ', err);
        }
    }

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
                Upload Cover Photo
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
                    name="bookName"
                    label="Book Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter book name",
                        },
                    ]}
                >
                    <Input placeholder="Please enter book name" />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="bookNumber"
                    label="Book Number"
                    rules={[
                        {
                            required: true,
                            message: "Please enter book number",
                        },
                    ]}
                >
                    <Input placeholder="Please enter book number" />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="autherName"
                    label="Auther Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter auther name",
                        },
                    ]}
                >
                    <Input placeholder="Please enter auther name" />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[
                        {
                            required: true,
                            message: "Please enter quantity",
                        },
                    ]}
                >
                    <Input placeholder="Please enter quantity" />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="publisherName"
                    label="Published By"
                    rules={[
                        {
                            required: true,
                            message: "Please enter published by",
                        },
                    ]}
                >
                    <Input placeholder="Please enter published by" />
                </Form.Item>
            </Col>
            {
                mode !== 'update' ?
            <Col>
                <Form.Item
                    name="publishedDate"
                    label="Published Date"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose the date',
                        },
                    ]}
                >
                    <DatePicker
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
            </Col>
            : null }
            <Col>
                <Form.Item
                    name="urlLink"
                    label="Online Link (Optional)"
                >
                    <Input placeholder="Please enter url link" />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="numberOfCopies"
                    label="No Of Copies"
                >
                    <Input type="number" placeholder="Please enter published by" />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="themeId"
                    label="Theme"
                    rules={[
                        {
                            required: false,
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
                    name="rackId"
                    label="Rack"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select rack"
                        allowClear
                    >
                        {
                            rackList.length > 0 && rackList.map((rack, i) => (
                                <Option value={rack._id} key={i}> {rack.rackName} </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="categoryId"
                    label="Category"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select category"
                        onChange={(value) => handleCategoryChange(value)}
                        allowClear
                    >
                        {
                            categoryList.length > 0 && categoryList.map((category, i) => (
                                <Option value={category._id} key={i}> {category.categoryName} </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="subcategoryId"
                    label="Subcategory"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select subcategory"
                        allowClear
                    >
                        {
                            subcategoryList.length > 0 && subcategoryList.map((subcategory, i) => (
                                <Option value={subcategory._id} key={i}> {subcategory.categoryName} </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="bookDescription"
                    label="Book Description"
                    rules={[
                        {
                            required: true,
                            message: "Please enter book description",
                        },
                    ]}
                >
                    <Input placeholder="Please enter book description" />
                </Form.Item>
            </Col>
            <Col className="mb-6">
                <Form.Item
                    name="image"
                    rules={[
                        {
                            required: mode == 'update' ? false : true,
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

export default BookForm;