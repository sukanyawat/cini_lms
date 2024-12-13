import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { PlusOutlined, ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
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
    Tag,
    Select
} from "antd";

import { getApiCall, postApiCall, putApiCall, deleteApiCall } from "../../../Api/ApiService/ApiService";
import { ROUTES_URL } from "../../../Api/Constant/Constant";

import showNotification from "../../../Components/CustomNotification/CustomNotification";
import UserForm from "./UserForm";

const User = () => {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState();
    const [mode, setMode] = useState("add");
    const [filters, setFilters] = useState({})
    const [form, formUser] = Form.useForm();
    const { confirm } = Modal;

    useEffect(() => {
        if (!open) {
            form.resetFields();
        }
    }, [open]);

    useEffect(() => {
        getUserData();
    }, [])

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
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Unit Name",
            dataIndex: "unitName",
            key: "unitName",
        },
        {
            title: "Designation",
            dataIndex: "designation",
            key: "designation",
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
            title: `Are you sure want to delete this user?`,
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
            const response = await deleteApiCall(`${ROUTES_URL.USER_URL}/${values._id}`);
            if (response.data) {
                showNotification({
                    type: "success",
                    description: "User Delete successfully",
                });
                getUserData();
            }
        } catch (err) {
            console.log(err);
        }

    };

    const handleUpdate = (record) => {
        setMode("update");

        if (record._id) {
            setUserId(record?._id);
            form.resetFields();
            form.setFieldsValue({
                "firstName": record?.firstName,
                "lastName": record?.lastName,
                "email": record?.email,
                "phoneNumber": record?.phoneNumber,
                "unitName": record?.unitName,
                "designation": record?.designation,
                "profilePicture": record?.profilePicture,
                "isActive": record?.isActive
            })
        }
        setOpen(true);
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            if (mode === "add") {
                const formData = new FormData();
                for (const key in values) {
                    if(key === 'profilePicture' && values[key]) {
                        formData.append(key, values[key].file.originFileObj);
                    } else {
                        formData.append(key, values[key]);
                    }
                }
                // let payload = {
                //     firstName: values.firstName,
                //     lastName: values.lastName,
                //     email: values.email,
                //     phoneNumber: values.phoneNumber,
                //     password: values.password,
                //     unitName: values.unitName,
                //     designation: values.designation
                // };

                const response = await postApiCall(ROUTES_URL.USER_URL, formData, true);
                console.log('response', response);
                if (response) {
                    showNotification({
                        type: "success",
                        description: "User added successfully",
                    });
                    onClose();
                    getUserData();
                }
            } else {
                const formData = new FormData();
                for (const key in values) {
                    if(key === 'profilePicture' && values[key]) {
                        formData.append(key, values[key].file.originFileObj);
                    } else {
                        formData.append(key, values[key]);
                    }
                }
                // let payload = {
                //     firstName: values.firstName,
                //     lastName: values.lastName,
                //     email: values.email,
                //     phoneNumber: values.phoneNumber,
                //     unitName: values.unitName,
                //     designation: values.designation,
                //     isActive: values.isActive
                // };

                const response = await putApiCall(`${ROUTES_URL.USER_URL}/${userId}`, formData, true);
                console.log('response', response);
                if (response) {
                    showNotification({
                        type: "success",
                        description: "User updated successfully",
                    });
                    onClose();
                    getUserData();
                }

            }
        }
        catch (err) {
            console.log('err',err);
            setLoading(false);
            message.error(err?.response?.data?.message);
            // message.error("Something went Wrong!");
        } finally {
            setLoading(false);
        }


    };

    const handleSearch = () => {
        getUserData();
    }

    const getUserData = async () => {
        try {
            setLoading(true);
            const response = await getApiCall(`${ROUTES_URL.USER_URL}?page=0&keyword=${filters.name?filters.name:''}&sort=${filters.sort?filters.sort:''}`, true);
            console.log('response', response);
            if (response) {
                const totalData = response?.data.data.users;
                const newData = totalData.map((item, i) => ({ ...item, key: i, srno: i + 1, name: item.firstName + ' ' + item.lastName }));
                setUserData(newData);
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
                    <p className={styles.title}>User List</p>
                    <div>
                        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                            Add New
                        </Button>
                    </div>
                </div>
                <Divider />
                <div style={{ width: "100%" }}>
                    <Space align="center" wrap className="mb-6">
                        Filter
                        <Input
                            placeholder="Search by name"
                            name="name"
                            // styles={{ width: 250, borderRadius: '25px' }}
                            prefix={<SearchOutlinedIcon sx={{ color: "lightgray" }} />}
                            // className="mb-6"
                            onChange={(e) => setFilters({...filters, name: e.target.value})}
                        />

                        <Select
                            // defaultValue="lucy"
                            placeholder="Sort by"
                            style={{ width: 210 }}
                            name="sort"
                            onChange={(val) => setFilters({...filters, sort: val})}
                            options={[
                                { value: 'desc', label: 'Created Desc' },
                                { value: 'asc', label: 'Created Asc' },
                            ]}
                        />

                        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>Search</Button>
                    </Space>

                    <Table columns={columns} dataSource={userData} loading={loading} />
                </div>
            </div>
            <Drawer

                title={mode === 'add' ? "Add User" : "Update User"}
                width={400}
                onClose={onClose}
                visible={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >

                <UserForm mode={mode} onFinish={onFinish} form={form} loading={loading} onClose={onClose} />
            </Drawer>
        </>
    );
};

export default User;