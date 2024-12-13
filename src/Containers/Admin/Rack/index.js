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
import RackForm from "./RackForm";

const Rack = () => {
    const [open, setOpen] = useState(false);
    const [rackData, setRackData] = useState();
    const [loading, setLoading] = useState(false);
    const [rackId, setRackId] = useState();
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
        getRackData();
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
        // {
        //     title: "Rack Name",
        //     dataIndex: "rackName",
        //     key: "rackName"
        // },
        {
            title: "Room Name",
            dataIndex: "roomName",
            key: "roomName"
        },
        {
            title: "Cabinet Number",
            dataIndex: "cabinetNumber",
            key: "cabinetNumber"
        },
        {
            title: "Rack Number",
            dataIndex: "rackNumber",
            key: "rackNumber"
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
            title: `Are you sure want to delete this rack?`,
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
            const response = await deleteApiCall(`${ROUTES_URL.RACK_URL}/${values._id}`);
            if (response.data) {
                showNotification({
                    type: "success",
                    description: "Rack Delete successfully",
                });
                getRackData();
            }
        } catch (err) {
            console.log(err);
        }

    };

    const handleUpdate = (record) => {
        setMode("update");

        if (record._id) {
            setRackId(record?._id);
            form.resetFields();
            form.setFieldsValue({
                "rackName": record?.rackName,
                "roomName": record?.roomName,
                "cabinetNumber": record?.cabinetNumber,
                "rackNumber": record?.rackNumber,
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
                    rackName: values.rackName,
                    roomName: values.roomName,
                    cabinetNumber: values.cabinetNumber,
                    rackNumber: values.rackNumber,
                    rackDescription: values.rackName
                };

                const response = await postApiCall(ROUTES_URL.RACK_URL, payload, true);
                console.log('response',response);
                if (response) {
                    showNotification({
                        type: "success",
                        description: "Rack added successfully",
                    });
                    onClose();
                    getRackData();
                }
            } else {
                let payload = {
                    rackName: values.rackName,
                    roomName: values.roomName,
                    cabinetNumber: values.cabinetNumber,
                    rackNumber: values.rackNumber,
                    isActive: values.isActive,
                };

                const response = await putApiCall(`${ROUTES_URL.RACK_URL}/${rackId}`, payload, true);
                console.log('response',response);
                if (response) {
                    showNotification({
                        type: "success",
                        description: "Rack updated successfully",
                    });
                    onClose();
                    getRackData();
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

    const getRackData = async () => {
        try {
            setLoading(true);
            const response = await getApiCall(ROUTES_URL.RACK_URL, true);
            console.log('response', response);
            if (response) {
                const totalData = response?.data.data;
                const newData = totalData.map((item, i) => ({ ...item, srno: i + 1 }));
                setRackData(newData);
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
                    <p className={styles.title}>Rack List</p>
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
                    <Table columns={columns} dataSource={rackData} loading={loading} />
                </div>
            </div>
            <Drawer

                title={mode === 'add' ? "Add Rack" : "Update Rack"}
                width={400}
                onClose={onClose}
                visible={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >

                <RackForm mode={mode} onFinish={onFinish} form={form} loading={loading} onClose={onClose} />
            </Drawer>
        </>
    );
};

export default Rack;