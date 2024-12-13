import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { PlusOutlined, ExclamationCircleOutlined, SearchOutlined, SendOutlined } from "@ant-design/icons";
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
import SendNotoficationForm from "./SendNotoficationForm";

const SendNotification = () => {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState();
    const [templateList, setTemplateList] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
        getTemplateData();
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
        }
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    const onFinish = async (values) => {
        try {
            setLoading(true);
            if (mode === "add") {
                let payload = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    password: values.password
                };

                const response = await postApiCall(ROUTES_URL.USER_URL, payload, true);
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
                let payload = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    isActive: values.isActive
                };

                const response = await putApiCall(`${ROUTES_URL.USER_URL}/${userId}`, payload, true);
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
            setLoading(false);
            message.error("Something went Wrong!");
        } finally {
            setLoading(false);
        }


    };

    const handleSendNotification = () => {
        showNotification({
            type: "success",
            description: "Notification send successfully",
        });
    }
    
    const getUserData = async () => {
        try {
            setLoading(true);
            const response = await getApiCall(`${ROUTES_URL.USER_URL}?page=0&keyword=${filters.name ? filters.name : ''}&sort=${filters.sort ? filters.sort : ''}`, true);
            console.log('response', response);
            if (response) {
                const totalData = response?.data.data.users;
                const newData = totalData.map((item, i) => ({ ...item, key: item._id, srno: i + 1, name: item.firstName + ' ' + item.lastName }));
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

    const getTemplateData = async () => {
        try {
            setLoading(true);
            const response = await getApiCall(ROUTES_URL.EMAIL_TEMPLATE_LIST_URL, true);
            console.log('response', response);
            if (response) {
                const totalData = response?.data.data.users;
                const newData = response?.data.data.map(val => ({
                    value: val._id,
                    label: val.emailSubject
                }));
                setTemplateList(newData);
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
                    <p className={styles.title}>Send Notification</p>
                    
                </div>
                <Divider />
                <div style={{ width: "100%" }}>
                    <Space align="center" wrap className="mb-6">
                        

                        <Select
                            // defaultValue="lucy"
                            placeholder="Select Email Template"
                            style={{ width: 210 }}
                            name="sort"
                            onChange={(val) => setFilters({ ...filters, sort: val })}
                            options={templateList}
                        />

                        <Button type="primary" icon={<SendOutlined />} onClick={handleSendNotification}>Send</Button>
                    </Space>

                    <Table rowSelection={rowSelection} columns={columns} dataSource={userData} loading={loading} />
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

                <SendNotoficationForm mode={mode} onFinish={onFinish} form={form} loading={loading} onClose={onClose} />
            </Drawer>
        </>
    );
};

export default SendNotification;