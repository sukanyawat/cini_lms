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
import moment from "moment";

import { getApiCall, postApiCall, putApiCall, deleteApiCall } from "../../../Api/ApiService/ApiService";
import { ROUTES_URL } from "../../../Api/Constant/Constant";

import showNotification from "../../../Components/CustomNotification/CustomNotification";
import BookForm from "./BookForm";
import BookDetails from "./BookDetails";

const Book = () => {
    const [open, setOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filerCategoryList, setFilerCategoryList] = useState([]);
    const [themeList, setThemeList] = useState([]);
    const [filerThemeList, setFilerThemeList] = useState([]);
    const [rackList, setRackList] = useState([]);
    const [bookData, setBookData] = useState();
    const [bookDetails, setBookDetails] = useState();
    const [loading, setLoading] = useState(false);
    const [bookId, setBookId] = useState();
    const [mode, setMode] = useState("add");
    const [filters, setFilters] = useState({keyword:'', themeId:'', categoryId:'', sort:'desc'})
    const [form] = Form.useForm();
    const { confirm } = Modal;

    useEffect(() => {
        if (!open) {
            form.resetFields();
        }
    }, [open]);

    useEffect(() => {
        form.resetFields();
        getThemeList();
        getRackList();
        getCategoryList();
    }, [filters]);

    useEffect(() => {
        getBookData();
    }, [filters]);

    const showDrawer = () => {
        setOpen(true);
        setMode("add");
    };

    const onClose = () => {
        setOpen(false);
    };

    const onCloseDrawer = () => {
        setDrawerOpen(false);
    };

    const columns = [
        {
            title: "SL No",
            dataIndex: "srno",
            key: "srno"
        },
        {
            title: "Book Name",
            dataIndex: "bookName",
            key: "bookName"
        },
        {
            title: "Theme",
            dataIndex: "themeTitle",
            key: "themeTitle"
        },
        {
            title: "Category",
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
                    <a className="cursor-pointer text-blue-600" onClick={() => handleView(record)}>
                        View
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
            title: `Are you sure want to delete this book?`,
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
            const response = await deleteApiCall(`${ROUTES_URL.BOOK_URL}/${values._id}`);
            if (response.data) {
                showNotification({
                    type: "success",
                    description: "Book Delete successfully",
                });
                getBookData();
            }
        } catch (err) {
            console.log(err);
        }

    };

    const handleUpdate = (record) => {
        setMode("update");

        if (record._id) {
            setBookId(record?._id);
            form.resetFields();
            form.setFieldsValue({...record, categoryId: record.categoryId._id, themeId: record.themeId._id, subcategoryId: record.subcategoryId?._id, publishedDate: moment(record.publishedDate).format('YYYY-MM-DD')})
        }
        setOpen(true);
    };

    const handleView = (record) => {
        setBookDetails(record);
        setMode("view");
        // if (record._id) {
        //     setBookId(record?._id);
        //     form.resetFields();
        //     form.setFieldsValue({...record})
        // }
        setDrawerOpen(true);
    };

    const onFinish = async (values) => {
        console.log('values', values);
        try {
            setLoading(true);
            if (mode === "add") {
                const formData = new FormData();
                for (const key in values) {
                    if(key === 'image' || key === 'ebookFile') {
                        formData.append(key, values[key].file.originFileObj);
                    } else {
                        formData.append(key, values[key]);
                    }
                }
                formData.append("bookType", "ebook");

                const response = await postApiCall(ROUTES_URL.BOOK_URL, formData, true);
                console.log('response',response);
                if (response) {
                    showNotification({
                        type: "success",
                        description: "Book added successfully",
                    });
                    onClose();
                    getBookData();
                }
            } else {
                const formData = new FormData();
                for (const key in values) {
                    if((values[key] && key === 'image') || (values[key] && key === 'ebookFile')) {
                        formData.append(key, values[key].file.originFileObj);
                    } else {
                        formData.append(key, values[key]);
                    }
                }

                const response = await putApiCall(`${ROUTES_URL.BOOK_URL}/${bookId}`, formData, true);
                console.log('response',response);
                if (response) {
                    showNotification({
                        type: "success",
                        description: "Book updated successfully",
                    });
                    onClose();
                    getBookData();
                }

            }
        }
        catch (err) {
            console.log('error => ',err);
            setLoading(false);
            message.error("Something went Wrong!");
        } finally {
            setLoading(false);
        }


    };
    
    const handleFilterChange = (name, value) => {
        setFilters({...filters, [name]: value});
    };

    const getBookData = async () => {
        try {
            // Convert JSON object to query string
            const queryString = new URLSearchParams(filters).toString();

            setLoading(true);
            const response = await getApiCall(`${ROUTES_URL.BOOK_URL}?type=ebook&${queryString}`, true);
            console.log('response', response);
            if (response) {
                const totalData = response?.data.data.books;
                const newData = totalData.map((item, i) => ({ ...item, key: i, srno: i + 1, categoryName: item.categoryId.categoryName, themeTitle: item.themeId.themeTitle }));
                setBookData(newData);
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

    const getThemeList = async () => {
        try {
            const response = await getApiCall(ROUTES_URL.THEME_LIST_URL, true);
            if (response && response.data.ack == 'ok') {
                setThemeList(response?.data.data);

                const themeList = response?.data.data.map(val => ({
                    value: val._id,
                    label: val.themeTitle
                }));
                setFilerThemeList([...themeList]);
            }
        } catch (err) {
            console.log('Error => ',err);
        }
    };

    const getRackList = async () => {
        try {
            const response = await getApiCall(ROUTES_URL.RACK_LIST_URL, true);
            console.log('response', response);
            if (response && response.data.ack == 'ok') {
                setRackList(response?.data.data);
            }
        } catch (err) {
            console.log('Error => ',err);
        }
    };

    const getCategoryList = async () => {
        try {
            const response = await getApiCall(ROUTES_URL.CATEGORY_LIST_URL, true);
            if (response && response.data.ack == 'ok') {
                const categoryList = response?.data.data.map(val => ({
                    value: val._id,
                    label: val.categoryName
                }));
                setFilerCategoryList([...categoryList]);
            }
        } catch (err) {
            console.log('Error => ',err);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.flex_container}>
                    <p className={styles.title}>E Book List</p>
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
                            // styles={{ width: 250, borderRadius: '25px' }}
                            prefix={<SearchOutlinedIcon sx={{ color: "lightgray" }} />}
                            // className="mb-6"
                            name="keyword"
                            onChange={(e) => handleFilterChange('keyword', e.target.value)}
                        />

                        <Select
                            // defaultValue="lucy"
                            placeholder="Select Theme"
                            name="themeId"
                            style={{ width: 210 }}
                            onChange={(val)=>handleFilterChange('themeId', val)}
                            options={filerThemeList}
                        />

                        <Select
                            // defaultValue="lucy"
                            placeholder="Select category"
                            name="categoryId"
                            style={{ width: 210 }}
                            onChange={(val)=>handleFilterChange('categoryId', val)}
                            options={filerCategoryList}
                        />

                        <Select
                            // defaultValue="lucy"
                            placeholder="Sort by"
                            style={{ width: 210 }}
                            name="sort"
                            onChange={(val)=>handleFilterChange('sort', val)}
                            options={[
                                { value: 'desc', label: 'Created Desc' },
                                { value: 'asc', label: 'Created Asc' },
                            ]}
                        />

                        <Button type="primary" icon={<SearchOutlined />}>Search</Button>
                    </Space>
                    <Table columns={columns} dataSource={bookData} loading={loading} />
                </div>
            </div>
            <Drawer

                title={mode === 'add' ? "Add E Book" : "Update E Book"}
                width={400}
                onClose={onClose}
                visible={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >

                <BookForm mode={mode} onFinish={onFinish} form={form} themeList={themeList} rackList={rackList} loading={loading} onClose={onClose} />
            </Drawer>

            <Drawer
                title={"Details"}
                width={400}
                onClose={onCloseDrawer}
                visible={drawerOpen}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <BookDetails book={bookDetails} loading={loading} onClose={onCloseDrawer} />
            </Drawer>
        </>
    );
};

export default Book;