import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
    Button,
    Divider,
    Space,
    Table,
    Drawer,
    Form,
    Input,
    Modal,
    message,
    Tag
} from "antd";

import { getApiCall, postApiCall, putApiCall, deleteApiCall } from "../../../Api/ApiService/ApiService";
import { ROUTES_URL } from "../../../Api/Constant/Constant";

import showNotification from "../../../Components/CustomNotification/CustomNotification";
import SubcategoryForm from "./SubcategoryForm";

const Subcategory = () => {
    const [open, setOpen] = useState(false);
    const [categoryData, setCategoryData] = useState();
    const [themeList, setThemeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryId, setCategoryId] = useState();
    const [mode, setMode] = useState("add");
    const [filters, setFilters] = useState("")
    const [form, formUser] = Form.useForm();
    const { confirm } = Modal;

    useEffect(() => {
        if (!open) {
            form.resetFields();
        }
    }, [open]);

    useEffect(() => {
        getSubcategoryData();
        getThemeList();
    }, [filters]);

    const showDrawer = () => {
        setOpen(true);
        setMode("add");
    };

    const onClose = () => {
        setOpen(false);
    };

    const columns = [
        {
            title: "SL No",
            dataIndex: "srno",
            key: "srno"
        },
        {
            title: "Theme Name",
            dataIndex: "themeTitle",
            key: "themeTitle"
        },
        {
            title: "Category Name",
            dataIndex: "parentName",
            key: "parentName"
        },
        {
            title: "Subcategory Name",
            dataIndex: "categoryName",
            key: "categoryName"
        },
        {
            title: 'Status',
            key: 'isActive',
            dataIndex: 'isActive',
            render: (isActive) => (
                <Tag color={isActive ? 'success' : 'warning'} >{isActive ? 'Active' : 'Inactive'}</Tag>
            ),
        },
        {
            title: "Action",
            align: "right",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <a className="cursor-pointer text-blue-600" onClick={() => handleUpdate(record)}>
                        Update
                    </a>
                    <a
                        className="cursor-pointer text-red-600"
                        onClick={() => showDeleteConfirm(record)}
                    >
                        Delete
                    </a>
                </Space>
            ),
        },
    ];

    const showDeleteConfirm = (values) => {
        confirm({
            title: `Are you sure want to delete this category?`,
            icon: <ExclamationCircleOutlined />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            centered: true,
            onOk() {
                handleDelete(values);
            },
            onCancel() { },
        });
    };

    const handleDelete = async (values) => {
        try {
            const response = await deleteApiCall(`${ROUTES_URL.SUB_CATEGORY_URL}/${values._id}`);
            if (response.data) {
                showNotification({
                    type: "success",
                    description: "Subcategory Delete successfully",
                });
                getSubcategoryData();
            }
        } catch (err) {
            console.log(err);
        }

    };

    const handleUpdate = (record) => {
        setMode("update");

        if (record._id) {
            setCategoryId(record?._id);
            form.resetFields();
            form.setFieldsValue({
                "categoryName": record?.categoryName,
                "parentId": record?.parentId?._id,
                "themeId": record?.themeId?._id,
                "isActive": record?.isActive
            })
        }
        setOpen(true);
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            if (mode === "add") {
                let payload = {
                    parentId: values.parentId,
                    themeId: values.themeId,
                    categoryName: values.categoryName,
                    description: values.categoryName
                };

                const response = await postApiCall(ROUTES_URL.SUB_CATEGORY_URL, payload, true);
                console.log('response',response);
                if (response) {
                    showNotification({
                        type: "success",
                        description: "Category added successfully",
                    });
                    onClose();
                    getSubcategoryData();
                }
            } else {
                let payload = {
                    parentId: values.parentId,
                    themeId: values.themeId,
                    categoryName: values.categoryName,
                    isActive: values.isActive,
                };

                const response = await putApiCall(`${ROUTES_URL.SUB_CATEGORY_URL}/${categoryId}`, payload, true);
                console.log('response',response);
                if (response) {
                    showNotification({
                        type: "success",
                        description: "Category updated successfully",
                    });
                    onClose();
                    getSubcategoryData();
                }

            }
        }
        catch (err) {
            setLoading(false);
            message.error("Something went Wrong!");
        } finally {
            setLoading(false);
        }


    };
    const handleFilterChange = (value) => {
        setFilters(value);
    };

    const getThemeList = async () => {
        try {
            const response = await getApiCall(ROUTES_URL.THEME_LIST_URL, true);
            if (response && response.data.ack == 'ok') {
                setThemeList(response?.data.data);
            }
        } catch (err) {
            console.log('Error => ', err);
        }
    };

    const getSubcategoryData = async () => {
        try {
            setLoading(true);
            const response = await getApiCall(ROUTES_URL.SUB_CATEGORY_URL, true);
            console.log('response', response);
            if (response) {
                const totalData = response?.data.data;
                const newData = totalData.map((item, i) => ({ ...item, themeTitle: item.themeId?.themeTitle, parentName: item.parentId?.categoryName, key: i, srno: i + 1 }));
                setCategoryData(newData);
            }
        } catch (err) {
            setLoading(false);
            showNotification({
                type: "error",
                description: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.flex_container}>
                    <p className={styles.title}>Subcategory List</p>
                    <div>
                        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                            Add New
                        </Button>
                    </div>
                </div>
                <Divider />
                <div style={{ width: "100%" }}>
                    {/* <Input
                        placeholder="Search by name"
                        prefix={<SearchOutlinedIcon sx={{ color: "lightgray" }} />}
                        className="mb-6"
                        onChange={(e) =>
                            handleFilterChange(e.target.value)
                        }
                    /> */}
                    <Table columns={columns} dataSource={categoryData} loading={loading} />
                </div>
            </div>
            <Drawer

                title={mode === 'add' ? "Add Sub Category" : "Update Sub Category"}
                width={400}
                onClose={onClose}
                visible={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >

                <SubcategoryForm mode={mode} themeList={themeList} onFinish={onFinish} form={form} loading={loading} onClose={onClose} />
            </Drawer>
        </>
    );
};

export default Subcategory;