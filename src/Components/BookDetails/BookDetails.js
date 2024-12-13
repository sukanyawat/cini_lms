import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
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
import "./style.css";
import { PlusOutlined, MinusOutlined, LikeOutlined, StarOutlined, MessageOutlined } from '@ant-design/icons';
import { getApiCall, postApiCall } from "../../Api/ApiService/ApiService";
import { ROUTES_URL } from "../../Api/Constant/Constant";
import { config } from "../../Config";
import moment from "moment";
import showNotification from "../CustomNotification/CustomNotification";
import FlipBook from "./FlipBook";
import axios from "axios";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;


const BookDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setBtnLoading] = useState(false);
  const [isFlikBookVisile, setIsFlikBookVisile] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState(null);
  const [homePageData, setHomePageData] = useState(null);
  const [requestBook, setRequestBook] = useState(null);

  useEffect(() => {
    getBookDetails();
    fetchHomePageData();
  }, [slug])

  const getBookDetails = async () => {
    try {
      setLoading(true);
      const payload = {
        slug: slug
      }
      const response = await postApiCall(ROUTES_URL.WEB_SEARCHPAGE_DETAILS_URL, payload);
      if (response) {
        setLoading(false);
        setBook(response?.data.data[0] || null);
      }
    } catch (err) {
      setLoading(false);
      console.log('Error => ', err);
    }
  };

  const fetchHomePageData = async () => {
    try {
      const payload = { type: 'all' };
      const response = await postApiCall(ROUTES_URL.WEB_HOMEPAGE_LIST_URL, payload);
      if (response) {
        setHomePageData(response?.data.data);
      }
    } catch (err) {
      console.log('Error => ', err);
    }
  }

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onCloseFlipBook = () => {
    setIsFlikBookVisile(false);
  }

  const handleBookNow = (item) => {
    setRequestBook(item);
    setOpen(true);
  };

  const handleBookView = (item) => {
    setIsFlikBookVisile(true)
  }

  const downloadPdf = async (item) => {
    try {
      const response = await axios.get(config.API_BASE_URL + item.ebookpath,
        {
          responseType: "blob"
        }
      )

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", item.ebookpath);

      document.body.appendChild(tempLink);
      tempLink.click();

      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log('Error => ', err);
    }
  }

  const onFinish = async (values) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/');
      }
      setBtnLoading(true);
      const payload = {
        checkIn: values.dateTime[0],
        checkOut: values.dateTime[1],
        bookId: requestBook._id,
        userId: userId,
        message: values.description
      }

      const response = await postApiCall(ROUTES_URL.WEB_SEND_BOOKING_REQUEST, payload, true);
      console.log('response', response);
      setBtnLoading(false);
      if (response) {
        showNotification({
          type: "success",
          description: "Your request sent successfully",
        });
      }
      form.resetFields();
      setOpen(false);
    }
    catch (err) {
      form.resetFields();
      console.log('error => ', err);
      setBtnLoading(false);
      setOpen(false);
      message.error("Something went Wrong!");
    } finally {
      form.resetFields();
      setBtnLoading(false);
      setOpen(false);
    }


  };


  return (
    <>
      <div style={{ background: 'rgb(250, 245, 240)' }}>
        <div className="container" style={{ margin: '0 auto' }}>
          <Spin spinning={loading}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <Breadcrumb
                items={[
                  {
                    title: "Home"
                  },
                  {
                    title: "Book List"
                  },
                  {
                    title: book ? book.bookName : null
                  }
                ]}
              >
              </Breadcrumb>
            </div>

            <Title style={{ color: "#5A2A27", textAlign: "center" }}>What are you looking for at the library</Title>

            <Layout style={{ minHeight: '100vh', marginTop: '10px' }}>
              <Content style={{ background: 'rgb(250, 245, 240)', paddingLeft: '20px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                <div style={{ padding: '20px' }}>
                  <Row gutter={[16, 16]}>
                    {/* Image Section */}
                    <Col xs={24} md={12}>
                      <img
                        src={config.API_BASE_URL + book?.coverImage} // Replace with your image URL
                        alt={book?.bookName}
                        // style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          maxHeight: '500px', // Adjust image height
                          objectFit: 'contain',
                        }}
                      />
                    </Col>

                    <Col xs={24} md={12}>
                      <div
                        className="book-description"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start', // Align content at the top
                          height: '100%',
                          marginTop: '-16px', // Reduce space from the top
                        }}
                      >
                        <h2>{book?.bookName}</h2>
                        <p><strong>Theme:</strong> {book?.themeId ? book?.themeId.themeTitle : null}</p>
                        <p><strong>Category:</strong> {book?.categoryId ? book?.categoryId.categoryName : null}</p>
                        <p><strong>Subcategory:</strong> {book?.subcategoryId ? book?.subcategoryId.categoryName : null}</p>
                        <p><strong>Author:</strong> {book?.autherName ? book.autherName : null}</p>
                        <p><strong>ISBN:</strong> {book?.bookNumber ? book.bookNumber : null}</p>
                        <p><strong>Publisher:</strong> {book?.publisherName ? book.publisherName : null}</p>
                        <p><strong>Published Date:</strong> {book?.publishedDate ? moment(book.publishedDate).format('DD MMMM, YYYY') : null}</p>
                        <p>{book?.bookDescription ? book.bookDescription : null}</p>

                        <div style={{ marginTop: '20px' }}>
                          {
                            book?.bookType == 'ebook' ?
                              <>
                                <Button className="book-now-btn" onClick={() => handleBookView(book)}>View</Button>
                                <Button className="book-now-btn" onClick={() => downloadPdf(book)}>Download</Button>
                              </> :
                              <Button className="book-now-btn" onClick={() => handleBookNow(book)}>Send Request</Button>
                          }
                        </div>
                      </div>

                    </Col>
                  </Row>
                </div>



                <div style={{ marginTop: "80px", textAlign: "left" }}>
                  <Text style={{ color: "#67130F", fontSize: '18px', fontWeight: '600' }}>Reference Books</Text>
                  <div style={{
                    display: "flex",
                    overflowX: "auto",
                    padding: "10px 0",
                    gap: "16px",
                    scrollbarWidth: "none" // Firefox
                  }}
                    className="scrollable-container">
                    {/* Each book card */}
                    {
                      homePageData && homePageData.bookRecomendation && homePageData.bookRecomendation.map((book, index) => {
                        return (
                          <Link to={"/book-list/" + book.bookSlug}>
                            <Card
                              key={index}
                              hoverable
                              style={{
                                width: "300px",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                overflow: "hidden",
                                textAlign: "center"
                              }}
                              cover={<img src={config.API_BASE_URL + book.coverImage} alt={book.title} style={{
                                height: '250px',
                                padding: '26px',
                                objectFit: 'cover'
                              }} />}
                            >
                              <div style={{ padding: "10px" }}>
                                <Text strong style={{ display: "block", fontSize: "14px" }}>{book.bookName}</Text>
                                <Text style={{ fontSize: "12px", color: "#888" }}>{book.autherName}</Text>
                              </div>
                            </Card>
                          </Link>
                        )
                      })
                    }

                  </div>
                </div>
              </Content>

            </Layout>

          </Spin>
        </div>
      </div>


      <Modal
        title="Send Request for Book"
        open={open}
        onCancel={onClose}
        maskClosable={false}
        footer={null}

        centered
        width={600}
        bodyStyle={{
          padding: 20,
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div className="modal-header">
          <img
            src={config.API_BASE_URL + requestBook?.coverImage}
            alt="Book Cover"
            className="modal-image"
          />
        </div>
        <div className="modal-content">
          <h2>{requestBook?.bookName}</h2>
          <div className="modal-boob-details">
            <p>
              <strong>Theme:</strong> {requestBook?.themeId?.themeTitle}<br />
              <strong>Category:</strong> {requestBook?.categoryId?.categoryName}<br />
              <strong>Subcategory:</strong> {requestBook?.subcategoryId?.categoryName}<br />
              <strong>Author:</strong> {requestBook?.autherName}<br />
              <strong>ISBN:</strong> {requestBook?.bookNumber}<br />
              <strong>Publisher:</strong> {requestBook?.publisherName}<br />
              <strong>Published Date:</strong> {requestBook?.publishedDate}<br />
            </p>
          </div>
          <Form layout="vertical" onFinish={onFinish}>
            <div className="form-row">
              <Form.Item label={<span className="bold-label">Current Date:</span>} name="currentDate" className="time-label">
                <p>{moment().format('DD/MM/YYYY')}</p>
              </Form.Item>
              <Form.Item label={<span className="bold-label">Current Time:</span>} name="currentTime" className="time-label">
                <p>{moment().format('LT')}</p>
              </Form.Item>
            </div>
            <Form.Item
              label="Requirement Date for Requisition:"
              name="dateTime"
              rules={[
                { required: true, message: 'Please select a date range!' },
              ]}
            >
              <DatePicker.RangePicker
                placeholder={['From Date', 'To Date']}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="Description for Requirements:"
              name="description"
              rules={[
                { required: true, message: 'Please enter your requirments!' },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <div className="form-actions">
              <Button onClick={onClose} danger>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {loadingBtn ? 'Loading...' : 'Send Request'}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
      <Modal
        open={isFlikBookVisile}
        onCancel={onCloseFlipBook}
        maskClosable={false}
        footer={null}

        centered
        width="80vw" // Use viewport width to make it responsive
        bodyStyle={{
          padding: 20,
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          height: '80vh', // Adjust height for larger content
          overflowY: 'auto', // Add scroll for overflowing content
        }}
      >
        <div className="modal-content">
          <h2>{book?.bookName}</h2>
          <FlipBook pdfFile={config.API_BASE_URL + book?.ebookpath} />

        </div>

      </Modal>
    </>
  );
};

export default BookDetails;
