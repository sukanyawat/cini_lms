import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Layout,
  Breadcrumb,
  Menu,
  Checkbox,
  Radio,
  Button,
  Card,
  Row,
  Col,
  Pagination,
  Table,
  DatePicker,
  Drawer,
  Modal,
  Form,
  Input,
  Select,
  Spin,
  Space,
  Typography,
  Collapse,
  List,
  message,
} from "antd";
import "./index.css";
import { SearchOutlined, MinusOutlined, LikeOutlined, StarOutlined, MessageOutlined } from '@ant-design/icons';
import { clientPostApiCall, getApiCall, postApiCall } from "../../Api/ApiService/ApiService";
import { ROUTES_URL } from "../../Api/Constant/Constant";
import { config } from "../../Config";
import moment from "moment";

const { Sider, Content } = Layout;
const { Option } = Select;
const { Panel } = Collapse;
const { Title, Text } = Typography;


const MyLibrary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const propsdata = location.state;

  const [searchedColumn, setSearchedColumn] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(0);
  const [libraryData, setLibraryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getLibraryList()
  }, [currentPage]);

  const getLibraryList = async () => {
    try {
      const payload = {
        limit: pageSize,
        page: currentPage
      }
      const response = await clientPostApiCall(ROUTES_URL.WEB_MY_LIBRARY_LIST, payload, true);
      if (response) {
        const newData = response?.data.data.list.map((item, i) => ({
          ...item,
          key: i,
          srno: i + 1,
          bookName: item.bookId?.bookName,
          autherName: item.bookId?.autherName,
        }));
        setLibraryData(newData);
        // setLibraryData(response?.data.data.list);
        setTotalItems(response?.data.data.totalItems);
      }
    } catch (err) {
      console.log('Error => ', err);
    }
  }


  const handleGlobalSearch = (value) => {
    setSearchQuery(value);
  };


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText("");
  };

  const handleDateFilter = (selectedKeys, confirm) => {
    confirm();
    setDateRange(selectedKeys[0]);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const filterData = (data) => {
    if (!searchQuery) return data;

    return data.filter((item) =>
      (item.orderNumber && item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const columns = [
    {
      title: "Book Name",
      dataIndex: "bookName",
      key: "bookName",
      width: 10,
    },
    {
      title: "Auther Name",
      dataIndex: "autherName",
      key: "autherName",
      width: 10,
    },
    {
      title: "CheckIn Date",
      dataIndex: "checkIn",
      key: "checkIn",
      width: 10,
      render: (text) => moment(text).format("YYYY-MM-DD hh:mm:ss A"), // Changed format here
    },
    {
      title: "CheckOut Date",
      dataIndex: "checkOut",
      key: "checkOut",
      width: 10,
      render: (text) => moment(text).format("YYYY-MM-DD hh:mm:ss A"), // Changed format here
    },
    {
      title: "Status",
      dataIndex: "requestStatus",
      key: "requestStatus",
      width: 10,
      render: (text) => (
        <span
          className={`px-5 py-[5px] rounded-full font-medium text-[12px] capitalize z-10 ${text.toLowerCase() === "pending"
            ? "bg-orange-300 text-orange-800"
            : "text-red-800 bg-red-300"
            }`}
        >
          {text.toLowerCase()}
        </span>
      ),
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <main className="flex items-center justify-center  p-4">
      <div className="w-full max-w-6xl ">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-0 items-center">
            <h2 className="text-2xl font-bold pl-3 p-2 text-[16px] text-gray-700">My Library</h2>

          </div>
          <div className="p-4">
            <Input
              placeholder="Search by Order Number or Name"
              value={searchQuery}
              onChange={(e) => handleGlobalSearch(e.target.value)}
              prefix={<SearchOutlined />}
              className="w-[300px]"
            />
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg bg-white">
          {console.log('libraryData',totalItems)}
          <Table
            columns={columns}
            dataSource={libraryData}
            // dataSource={filterData(data).slice(
            //   (currentPage - 1) * pageSize,
            //   currentPage * pageSize
            // )}
            pagination={false}
            className="custom-table font-medium"
            rowClassName="bg-white font-mont hover:bg-gray-100"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={["10", "20", "50", "100"]}
            itemRender={(page, type, originalElement) => {
              if (type === "page") {
                const isActive = page === currentPage;
                return (
                  <span
                    className={`px-3 py-1 font-mont rounded-full cursor-pointer ${isActive
                      ? "bg-[#af3ccccb] text-white"
                      : "bg-[#af3ccc70] text-[#841b9ee0] font-medium hover:bg-[#af3ccc70]"
                      }`}
                  >
                    {page}
                  </span>
                );
              }
              return originalElement;
            }}
          />
        </div>
      </div>
    </main>
  )
}

export default MyLibrary;
