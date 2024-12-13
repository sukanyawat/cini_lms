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
// import UserRequestForm from "./UserRequestForm";
import moment from "moment/moment";

const UserRequest = () => {
    const [open, setOpen] = useState(false);
    const [requestList, setRequestList] = useState();
    const [loading, setLoading] = useState(false);
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
        getRequestData();
    }, []);

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
            title: "Requester Name",
            dataIndex: "requesterName",
            key: "requesterName"
        },
        {
            title: "Requester Email",
            dataIndex: "requesterEmail",
            key: "requesterEmail"
        },
        {
            title: "Book Name",
            dataIndex: "bookName",
            key: "bookName"
        },
        {
            title: "Check In",
            dataIndex: "checkIn",
            key: "checkIn"
        },
        {
            title: "Check Out",
            dataIndex: "checkOut",
            key: "checkOut"
        },
        {
            title: "Message",
            dataIndex: "message",
            key: "message"
        },
        {
            title: 'Status',
            key: 'requestStatus',
            dataIndex: 'requestStatus',
            render: (text) => (
                <span
                    className={`px-5 py-[5px] rounded-full font-medium text-[12px] capitalize z-10 ${text.toLowerCase() === "pending"
                        ? "bg-orange-300 text-orange-800"
                        : "text-red-800 bg-red-300"
                        }`}
                >{text.toLowerCase()}</span>
            ),
        },
        {
            title: "Action",
            align: "right",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <a
                        className="cursor-pointer px-5 py-2 text-white hover:text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
                        onClick={() => updateBookReturned(record)}
                    >
                        Book Returned
                    </a>
                </Space>
            ),
        }
    ];

    const updateBookReturned = async(record) => {
        try {
            const payload = {
                requestId: record._id,
                status: 'returned'
            }
            const response = await postApiCall(ROUTES_URL.USER_BOOK_REQUEST_UPDATE_URL, payload, true);
            if (response.data) {
                showNotification({
                    type: "success",
                    description: "Status updated successfully",
                });
                getRequestData();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getRequestData = async () => {
        try {
            setLoading(true);
            const payload = {

            }
            const response = await postApiCall(ROUTES_URL.USER_BOOK_RECORD_LIST_URL, payload, true);
            console.log('response', response);
            if (response) {
                const totalData = response?.data.data.records;
                const newData = totalData.map((item, i) => ({
                    ...item,
                    key: i,
                    srno: i + 1,
                    requesterName: item.userId?.firstName + ' ' + item.userId?.lastName || "N/A",
                    requesterEmail: item.userId?.email || "N/A",
                    bookName: item.bookId?.bookName || "N/A",
                    checkIn: moment(item.checkIn).format('YYYY-MM-DD'),
                    checkOut: moment(item.checkOut).format('YYYY-MM-DD')
                }));
                setRequestList(newData);
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
                    <p className={styles.title}>Record List</p>
                    {/* <div>
                        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                            Add New
                        </Button>
                    </div> */}
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
                    <Table columns={columns} dataSource={requestList} loading={loading} />
                </div>
            </div>
            {/* <Drawer

                title="Add Comment"
                width={400}
                onClose={onClose}
                visible={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >

                <UserRequestForm onFinish={onFinish} form={form} loading={loading} onClose={onClose} />
            </Drawer> */}
        </>
    );
};

export default UserRequest;