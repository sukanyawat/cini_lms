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
import EmailTemplateForm from "./EmailTemplateForm";

const EmailTemplate = () => {
    const [open, setOpen] = useState(false);
    const [templateList, setTemplateList] = useState();
    const [loading, setLoading] = useState(false);
    const [templateId, setTemplateId] = useState();
    const [mode, setMode] = useState("add");
    const [form, formUser] = Form.useForm();
    const { confirm } = Modal;

    useEffect(() => {
        if (!open) {
            form.resetFields();
        }
    }, [open]);

    useEffect(() => {
        getEmailTemplateData();
    }, []);

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
            title: "Subject",
            dataIndex: "emailSubject",
            key: "emailSubject"
        },
        {
            title: "Content",
            dataIndex: "emailContent",
            key: "emailContent"
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
            title: `Are you sure want to delete this template?`,
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
            // const response = await deleteApiCall(`${ROUTES_URL.THEME_URL}/${values._id}`);
            const response = true;
            if (response.data) {
                showNotification({
                    type: "success",
                    description: "Email template Delete successfully",
                });
                getEmailTemplateData();
            }
        } catch (err) {
            console.log(err);
        }

    };

    const handleUpdate = (record) => {
        setMode("update");

        if (record._id) {
            setTemplateId(record?._id);
            form.resetFields();
            form.setFieldsValue({
                "emailSubject": record?.emailSubject,
                "emailContent": record?.emailContent,
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
                    emailSubject: values.emailSubject,
                    emailContent: values.emailContent,
                };

                const response = await postApiCall(ROUTES_URL.EMAIL_TEMPLATE_URL, payload, true);
                console.log('response', response);
                if (response) {
                    showNotification({
                        type: "success",
                        description: "User added successfully",
                    });
                    onClose();
                    getEmailTemplateData();
                }
            } else {
                let payload = {
                    emailSubject: values.emailSubject,
                    emailContent: values.emailContent,
                    isActive: values.isActive
                };

                const response = await putApiCall(`${ROUTES_URL.EMAIL_TEMPLATE_URL}/${templateId}`, payload, true);
                console.log('response', response);
                if (response) {
                    showNotification({
                        type: "success",
                        description: "User updated successfully",
                    });
                    onClose();
                    getEmailTemplateData();
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

    const getEmailTemplateData = async () => {
        try {
            setLoading(true);
            const response = await getApiCall(ROUTES_URL.EMAIL_TEMPLATE_URL, true);
            console.log('response', response);
            if (response) {
                const totalData = response?.data.data;
                const newData = totalData.map((item, i) => ({ ...item, key: i, srno: i + 1 }));
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
                    <p className={styles.title}>Email Template List</p>
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
                    <Table columns={columns} dataSource={templateList} loading={loading} />
                </div>
            </div>
            <Drawer

                title={mode === 'add' ? "Add Email Template" : "Update Email Template"}
                width={400}
                onClose={onClose}
                visible={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >

                <EmailTemplateForm mode={mode} onFinish={onFinish} form={form} loading={loading} onClose={onClose} />
            </Drawer>
        </>
    );
};

export default EmailTemplate;