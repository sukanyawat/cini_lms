// import React, { useEffect, useState } from "react";
// import {
//   Layout,
//   Button,
//   Row,
//   Col,
//   Input,
//   Select,
//   Typography,
//   Space,
//   Card,
//   Tabs,
//   Spin
// } from "antd";
// import moment from "moment";
// import Slider from "react-slick";
// import styles from "./index.module.css";
// import TabPane from "antd/es/tabs/TabPane";
// import { getApiCall, postApiCall } from "../../Api/ApiService/ApiService";
// import { ROUTES_URL } from "../../Api/Constant/Constant";
// import { config } from "../../Config";
// import { Link, useNavigate } from "react-router-dom";
// import { LoadingOutlined } from '@ant-design/icons';

// const { Content } = Layout;
// const { Option } = Select;
// const { Title, Text } = Typography;

// const HomeContent = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [keyword, setKeyword] = useState(null);
//   const [themeList, setThemeList] = useState([]);
//   const [homePageData, setHomePageData] = useState(null);
//   const [themeId, setThemeId] = useState(null);
//   const [categoryList, setCategoryList] = useState([]);
//   const [categoryId, setCategoryId] = useState(null);
//   const [subcategoryList, setSubcategoryList] = useState([]);
//   const [subcategoryId, setSubcategoryId] = useState(null);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     getThemeList();
//     fetchHomePageData();
//   }, []);

//   const getThemeList = async () => {
//     try {
//       const response = await getApiCall(ROUTES_URL.WEB_THEME_LIST_URL, true);
//       if (response) {
//         setThemeList(response?.data.data);
//       }
//     } catch (err) {
//       console.log('Error => ', err);
//     }
//   };

//   const fetchHomePageData = async () => {
//     try {
//       setLoading(true);
//       const payload = { type: 'all' };
//       const response = await postApiCall(ROUTES_URL.WEB_HOMEPAGE_LIST_URL, payload);
//       if (response) {
//         setLoading(false);
//         setHomePageData(response?.data.data);
//       }
//     } catch (err) {
//       setLoading(false);
//       console.log('Error => ', err);
//     }
//   }

//   const handleChangeTheme = (val) => {
//     setThemeId(val);
//     getCategoryList(val);
//   }

//   const getCategoryList = async (id) => {
//     try {
//       const response = await getApiCall(`${ROUTES_URL.WEB_CATEGORY_LIST_URL}?themeid=${id}`, true);
//       if (response) {
//         setCategoryList(response?.data.data);
//       }
//     } catch (err) {
//       console.log('Error => ', err);
//     }
//   };

//   const handleChangeCategory = (val) => {
//     setCategoryId(val);
//     getSubcategoryList(val);
//   }

//   const getSubcategoryList = async (id) => {
//     try {
//       const response = await getApiCall(`${ROUTES_URL.WEB_SUBCATEGORY_LIST_URL}?categoryid=${id}`, true);
//       if (response) {
//         setSubcategoryList(response?.data.data);
//       }
//     } catch (err) {
//       console.log('Error => ', err);
//     }
//   };

//   const handleChangeSubcategory = (val) => {
//     setSubcategoryId(val);
//   }

//   const handleSearch = () => {
//     const params = {
//       themeId,
//       categoryId,
//       subcategoryId,
//       keyword
//     }
//     navigate("/book-list", { state: params });
//   }

//   // Fetch user's name from localStorage
//   useEffect(() => {
//     const storedName = localStorage.getItem("username");
//     setUsername(storedName ? storedName : "User"); // Fallback to "User" if no name is stored
//   }, []);


//   // Get the current date and time
//   const currentDate = moment().format("MMM DD, YYYY | dddd, hh:mm A");

//   // Carousel settings for react-slick
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   return (
//     <Layout style={{ background: "#FAF5F0", minHeight: "100vh" }}>
//       <Content style={{ padding: "20px", textAlign: "center" }}>
//         <Spin spinning={loading}>
//           <div style={{ marginBottom: "20px" }}>
//             <Text style={{ fontSize: "20px", color: "#8D563A" }}>
//               HELLO,{" "}
//               <Text style={{ color: "#FF9500", fontSize: "20px" }}>
//                 {username.toUpperCase()}!
//               </Text>
//             </Text>
//             <br />
//             <Text style={{ fontSize: "16px", color: "#8D563A" }}>
//               {currentDate}
//             </Text>
//           </div>

//           <Title style={{ color: "#5A2A27" }}>Best Book Available</Title>
//           <Text style={{ fontSize: "16px", color: "#A05247" }}>
//             Discover eBooks & physical books
//           </Text>

//           {/* Centered container for search section and cards */}
//           <div
//             style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "20px" }}
//           >
//             <Card
//               style={{
//                 marginTop: "20px",
//                 display: "flex",
//                 alignItems: "center",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "8px",
//                 backgroundColor: "#FFFFFF",
//                 // padding: "10px 20px",
//               }}
//               bodyStyle={{
//                 padding: "10px"
//               }}
//             >
//               <Space
//                 size="middle"
//                 style={{ display: "flex", alignItems: "center", width: "100%" }}
//               >
//                 <Select
//                   placeholder="By All Themes"
//                   bordered={false}
//                   style={{ width: "230px" }}
//                   onChange={handleChangeTheme}
//                 >
//                   {
//                     themeList.length > 0 && themeList.map((theme) => {
//                       return <Option value={theme._id}>{theme.themeTitle}</Option>
//                     })
//                   }
//                 </Select>
//                 <Select
//                   placeholder="By Categories"
//                   bordered={false}
//                   style={{ width: "230px" }}
//                   onChange={handleChangeCategory}
//                 >
//                   {
//                     categoryList.length > 0 && categoryList.map((category) => {
//                       return <Option value={category._id}>{category.categoryName}</Option>
//                     })
//                   }
//                 </Select>
//                 <Select
//                   placeholder="By Sub-categories"
//                   bordered={false}
//                   style={{ width: "230px" }}
//                   onChange={handleChangeSubcategory}
//                 >
//                   {
//                     subcategoryList.length > 0 && subcategoryList.map((subcategory) => {
//                       return <Option value={subcategory._id}>{subcategory.categoryName}</Option>
//                     })
//                   }
//                 </Select>
//                 <Input
//                   placeholder="Find the book you like..."
//                   style={{ width: "330px", border: "none", boxShadow: "none" }}
//                   onChange={(e) => setKeyword(e.target.value)}
//                 />
//                 <Button
//                   type="primary"
//                   style={{
//                     backgroundColor: "#8D563A",
//                     borderColor: "#8D563A",
//                     borderRadius: "4px",
//                     padding: "0 20px",
//                     height: "40px",
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                   }}
//                   onClick={handleSearch}
//                 >
//                   Search
//                 </Button>
//               </Space>
//             </Card>

//             <Row
//               gutter={16}
//               style={{ marginTop: "30px", justifyContent: "center" }}
//             >
//               <Col span={8}>
//                 <img src={"assets/Card.svg"} alt="CINI Logo" />
//               </Col>
//               <Col span={8}>
//                 <img src={"assets/Card-1.svg"} alt="CINI Logo" />
//               </Col>
//               <Col span={8}>
//                 <img src={"assets/Card-2.svg"} alt="CINI Logo" />
//               </Col>
//             </Row>
//           </div>

//           {/* Book Recommendation Carousel */}
//           <div style={{ maxWidth: "1200px", margin: "50px auto", textAlign: "left" }}>
//             {/* <Slider {...settings}> */}
//             <div style={{ marginTop: "40px", textAlign: "left" }}>
//               <Title style={{ color: "#333333" }}>Book Recommendation</Title>
//               <div style={{
//                 display: "flex",
//                 overflowX: "auto",
//                 padding: "10px 0",
//                 gap: "16px",
//                 scrollbarWidth: "none" // Firefox
//               }}
//                 className="scrollable-container">
//                 {/* Each book card */}
//                 {
//                   homePageData && homePageData.bookRecomendation && homePageData.bookRecomendation.map((book, index) => {
//                     return (
//                       <Link to={"/book-list/" + book.bookSlug}>
//                         <Card
//                           key={index}
//                           hoverable
//                           style={{
//                             width: "300px",
//                             borderRadius: "8px",
//                             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                             overflow: "hidden",
//                             textAlign: "center"
//                           }}
//                           cover={<img src={config.API_BASE_URL + book.coverImage} alt={book.title} className={styles.box_one} />}
//                         >
//                           <div style={{ padding: "10px" }}>
//                             <Text strong style={{ display: "block", fontSize: "14px" }}>{book.bookName}</Text>
//                             <Text style={{ fontSize: "12px", color: "#888" }}>{book.autherName}</Text>
//                           </div>
//                         </Card>
//                       </Link>
//                     )
//                   })
//                 }

//               </div>
//             </div>
//             {/* </div> */}
//             {/* </Slider> */}
//             <div style={{ maxWidth: "1200px", margin: "50px auto", display: "flex", gap: "20px" }}>
//               {/* Sidebar for New Releases Information */}
//               <div style={{ flex: 1, backgroundColor: "#FFF7EC", padding: "20px", borderRadius: "8px" }}>
//                 <Title level={3} style={{ color: "#333333" }}>Check Out</Title>
//                 <Title level={2} style={{ color: "#FF9500" }}>The New Releases</Title>
//                 <Text style={{ color: "#666666", fontSize: "14px" }}>
//                   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//                 </Text>
//                 <br />
//                 <a href="#" style={{ color: "#FF9500", fontWeight: "bold", fontSize: "14px" }}>View All</a>
//               </div>

//               {/* Tabs and Book Cards for New Releases */}
//               <div style={{ flex: 3 }}>
//                 <Tabs className={styles.customNewReleaseTab} defaultActiveKey="1" >
//                   <TabPane tab={<span className={styles.tabButton}>All Books</span>} key="1">
//                     <Row gutter={[16, 16]}>
//                       {
//                         homePageData && homePageData.allBooks && homePageData.allBooks.map((book, index) => (
//                           <Col span={6} key={index}>
//                             <Link to={"/book-list/" + book.bookSlug}>
//                               <Card
//                                 hoverable
//                                 cover={<img alt={book.title} src={config.API_BASE_URL + book.coverImage} style={{ height: "250px", objectFit: "cover", borderRadius: "8px" }} />}
//                                 style={{ borderRadius: "8px", textAlign: "center" }}
//                               >
//                                 <Text strong>{book.bookName}</Text>
//                               </Card>
//                             </Link>
//                           </Col>
//                         ))}
//                     </Row>
//                   </TabPane>
//                   <TabPane tab={<span className={styles.tabButton}>eBooks</span>} key="2" className="tab_content-list">
//                     <Row gutter={[16, 16]}>
//                       {
//                         homePageData && homePageData.eBooks && homePageData.eBooks.map((book, index) => (
//                           <Col span={6} key={index}>
//                             <Link to={"/book-list/" + book.bookSlug}>
//                               <Card
//                                 hoverable
//                                 cover={<img alt={book.title} src={config.API_BASE_URL + book.coverImage} style={{ height: "250px", objectFit: "cover", borderRadius: "8px" }} />}
//                                 style={{ borderRadius: "8px", textAlign: "center" }}
//                               >
//                                 <Text strong>{book.bookName}</Text>
//                               </Card>
//                             </Link>
//                           </Col>
//                         ))}
//                     </Row>
//                   </TabPane>
//                   <TabPane tab={<span className={styles.tabButton}>Book Listed</span>} key="3">
//                     <Row gutter={[16, 16]}>
//                       {
//                         homePageData && homePageData.listedBooks && homePageData.listedBooks.map((book, index) => (
//                           <Col span={6} key={index}>
//                             <Link to={"/book-list/" + book.bookSlug}>
//                               <Card
//                                 hoverable
//                                 cover={<img alt={book.title} src={config.API_BASE_URL + book.coverImage} style={{ height: "250px", objectFit: "cover", borderRadius: "8px" }} />}
//                                 style={{ borderRadius: "8px", textAlign: "center" }}
//                               >
//                                 <Text strong>{book.bookName}</Text>
//                               </Card>
//                             </Link>
//                           </Col>
//                         ))}
//                     </Row>
//                   </TabPane>
//                   <TabPane tab={<span className={styles.tabButton}>Issued Book</span>} key="4">
//                     <Row gutter={[16, 16]}>
//                       {
//                         homePageData && homePageData.issuedBooks && homePageData.issuedBooks.map((book, index) => (
//                           <Col span={6} key={index}>
//                             <Link to={"/book-list/" + book.bookSlug}>
//                               <Card
//                                 hoverable
//                                 cover={<img alt={book.title} src={config.API_BASE_URL + book.coverImage} style={{ height: "250px", objectFit: "cover", borderRadius: "8px" }} />}
//                                 style={{ borderRadius: "8px", textAlign: "center" }}
//                               >
//                                 <Text strong>{book.bookName}</Text>
//                               </Card>
//                             </Link>
//                           </Col>
//                         ))}
//                     </Row>
//                   </TabPane>
//                   <TabPane tab={<span className={styles.tabButton}>Physical Book</span>} key="5">
//                     <Row gutter={[16, 16]}>
//                       {
//                         homePageData && homePageData.pBooks && homePageData.pBooks.map((book, index) => (
//                           <Col span={6} key={index}>
//                             <Link to={"/book-list/" + book.bookSlug}>
//                               <Card
//                                 hoverable
//                                 cover={<img alt={book.title} src={config.API_BASE_URL + book.coverImage} style={{ height: "250px", objectFit: "cover", borderRadius: "8px" }} />}
//                                 style={{ borderRadius: "8px", textAlign: "center" }}
//                               >
//                                 <Text strong>{book.bookName}</Text>
//                               </Card>
//                             </Link>
//                           </Col>
//                         ))}
//                     </Row>
//                   </TabPane>
//                   {/* Add other categories here */}
//                 </Tabs>
//               </div>
//             </div>
//           </div>

//           {/* latest eBook */}
//           <div style={{ maxWidth: "1200px", margin: "50px auto", textAlign: "left" }}>
//             <div style={{ marginTop: "40px", textAlign: "left" }}>
//               <div className={styles.latest_ebook_title}>
//                 <Title style={{ color: "#333333" }}>Latest eBook</Title>
//                 <button>View All</button>
//               </div>
//               <div style={{
//                 display: "flex",
//                 overflowX: "auto",
//                 padding: "10px 0",
//                 gap: "16px",
//                 scrollbarWidth: "none" // Firefox
//               }}
//                 className="scrollable-container">
//                 {/* Each book card */}
//                 {
//                   homePageData && homePageData.bookRecomendation && homePageData.bookRecomendation.map((book, index) => {
//                     return (
//                       <Link to={"/book-list/" + book.bookSlug}>
//                         <Card
//                           key={index}
//                           hoverable
//                           style={{
//                             width: "300px",
//                             borderRadius: "8px",
//                             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                             overflow: "hidden",
//                             textAlign: "center"
//                           }}
//                           cover={<img src={config.API_BASE_URL + book.coverImage} alt={book.title} className={styles.box_one} />}
//                         >
//                           <div style={{ padding: "10px" }}>
//                             <Text strong style={{ display: "block", fontSize: "14px" }}>{book.bookName}</Text>
//                             <Text style={{ fontSize: "12px", color: "#888" }}>{book.autherName}</Text>
//                           </div>
//                         </Card>
//                       </Link>
//                     )
//                   })
//                 }

//               </div>
//             </div>
//           </div>
//         </Spin>
//       </Content>
//     </Layout>
//   );
// };

// export default HomeContent;


import React, { useEffect, useState, useCallback } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Input,
  Select,
  Typography,
  Space,
  Card,
  Tabs,
  Spin,
  Grid,
  message
} from "antd";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';

import styles from "./index.module.css";
import { getApiCall, postApiCall } from "../../Api/ApiService/ApiService";
import { ROUTES_URL } from "../../Api/Constant/Constant";
import { config } from "../../Config";

const { Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
const { TabPane } = Tabs;

const HomeContent = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  
  // State Management
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [themeList, setThemeList] = useState([]);
  const [homePageData, setHomePageData] = useState({
    bookRecomendation: [],
    allBooks: [],
    eBooks: [],
    listedBooks: [],
    issuedBooks: [],
    pBooks: []
  });
  const [themeId, setThemeId] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [subcategoryId, setSubcategoryId] = useState(null);
  const [username, setUsername] = useState("");

  // Lifecycle and Data Fetching
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          getThemeList(),
          fetchHomePageData()
        ]);
      } catch (error) {
        message.error("Failed to load initial data");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Username Retrieval
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    setUsername(storedName || "User");
  }, []);

  // API Call Functions
  const getThemeList = async () => {
    try {
      const response = await getApiCall(ROUTES_URL.WEB_THEME_LIST_URL, true);
      if (response?.data?.data) {
        setThemeList(response.data.data);
      }
    } catch (err) {
      message.error("Failed to fetch themes");
      console.error('Theme List Fetch Error:', err);
    }
  };

  const fetchHomePageData = async () => {
    try {
      const payload = { type: 'all' };
      const response = await postApiCall(ROUTES_URL.WEB_HOMEPAGE_LIST_URL, payload);
      if (response?.data?.data) {
        setHomePageData(response.data.data);
      }
    } catch (err) {
      message.error("Failed to fetch home page data");
      console.error('Home Page Data Fetch Error:', err);
    }
  };

  // Cascading Selection Handlers
  const handleChangeTheme = async (val) => {
    setThemeId(val);
    await getCategoryList(val);
  };

  const getCategoryList = async (id) => {
    try {
      const response = await getApiCall(`${ROUTES_URL.WEB_CATEGORY_LIST_URL}?themeid=${id}`, true);
      if (response?.data?.data) {
        setCategoryList(response.data.data);
      }
    } catch (err) {
      message.error("Failed to fetch categories");
      console.error('Category List Fetch Error:', err);
    }
  };

  const handleChangeCategory = async (val) => {
    setCategoryId(val);
    await getSubcategoryList(val);
  };

  const getSubcategoryList = async (id) => {
    try {
      const response = await getApiCall(`${ROUTES_URL.WEB_SUBCATEGORY_LIST_URL}?categoryid=${id}`, true);
      if (response?.data?.data) {
        setSubcategoryList(response.data.data);
      }
    } catch (err) {
      message.error("Failed to fetch subcategories");
      console.error('Subcategory List Fetch Error:', err);
    }
  };

  const handleChangeSubcategory = (val) => {
    setSubcategoryId(val);
  };

  // Search Handler
  const handleSearch = () => {
    const params = {
      themeId,
      categoryId,
      subcategoryId,
      keyword
    };
    navigate("/book-list", { state: params });
  };

  // Render Helpers
  const renderBookCard = (book, index) => (
    <Link key={index} to={`/book-list/${book.bookSlug}`}>
      <Card
        hoverable
        style={{
          width: screens.xs ? "100%" : "300px",
          borderRadius: "8px",
          textAlign: "center",
          margin: "0 8px 16px 0"
        }}
        cover={
          <img 
            src={config.API_BASE_URL + book.coverImage} 
            alt={book.title} 
            className={styles.box_one} 
          />
        }
      >
        <Text strong style={{ display: "block" }}>{book.bookName}</Text>
        <Text type="secondary">{book.autherName}</Text>
      </Card>
    </Link>
  );

  // Render Book Grid
  const renderBookGrid = (books) => (
    <Row gutter={[16, 16]}>
      {books.map((book, index) => (
        <Col key={index} xs={12} sm={8} md={6} lg={6} xl={6}>
          <Link to={`/book-list/${book.bookSlug}`}>
            <Card
              hoverable
              cover={
                <img 
                  alt={book.title} 
                  src={config.API_BASE_URL + book.coverImage} 
                  style={{ 
                    height: "250px", 
                    objectFit: "cover", 
                    borderRadius: "8px" 
                  }} 
                />
              }
              style={{ borderRadius: "8px", textAlign: "center" }}
            >
              <Text strong>{book.bookName}</Text>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );

  return (
    <Layout style={{ background: "#FAF5F0", minHeight: "100vh" }}>
      <Content style={{ 
        padding: screens.xs ? "10px" : "20px", 
        textAlign: "center" 
      }}>
        <Spin 
          spinning={loading} 
          indicator={<LoadingOutlined style={{ fontSize: 40 }} />}
        >
          {/* User Greeting */}
          <div style={{ marginBottom: "20px" }}>
            <Text style={{ 
              fontSize: screens.xs ? "16px" : "20px", 
              color: "#8D563A" 
            }}>
              HELLO, <Text style={{ color: "#FF9500" }}>{username.toUpperCase()}!</Text>
            </Text>
            <br />
            <Text style={{ 
              fontSize: screens.xs ? "12px" : "16px", 
              color: "#8D563A" 
            }}>
              {moment().format("MMM DD, YYYY | dddd, hh:mm A")}
            </Text>
          </div>

          <Title style={{ color: "#5A2A27" }}>Best Book Available</Title>
          <Text style={{ fontSize: "16px", color: "#A05247" }}>
            Discover eBooks & physical books
          </Text>

          {/* Search Section */}
          <Card 
            style={{ 
              width: "100%", 
              maxWidth: "1200px", 
              margin: "0 auto",
              padding: screens.xs ? "20px" : "0px" 
            }}
          >
            <Space 
              direction={screens.xs ? "vertical" : "horizontal"} 
              size="middle" 
              style={{ width: "100%" }}
            >
              {/* Theme Select */}
              <Select
                placeholder="By All Themes"
                style={{ width: screens.xs ? "100%" : "230px" }}
                onChange={handleChangeTheme}
              >
                {themeList.map(theme => (
                  <Option key={theme._id} value={theme._id}>
                    {theme.themeTitle}
                  </Option>
                ))}
              </Select>

              {/* Category Select */}
              <Select
                placeholder="By Categories"
                style={{ width: screens.xs ? "100%" : "230px" }}
                onChange={handleChangeCategory}
              >
                {categoryList.map(category => (
                  <Option key={category._id} value={category._id}>
                    {category.categoryName}
                  </Option>
                ))}
              </Select>

              {/* Subcategory Select */}
              <Select
                placeholder="By Sub-categories"
                style={{ width: screens.xs ? "100%" : "230px" }}
                onChange={handleChangeSubcategory}
              >
                {subcategoryList.map(subcategory => (
                  <Option key={subcategory._id} value={subcategory._id}>
                    {subcategory.categoryName}
                  </Option>
                ))}
              </Select>

              {/* Keyword Search */}
              <Input
                placeholder="Find the book you like..."
                style={{ width: screens.xs ? "100%" : "330px" }}
                onChange={(e) => setKeyword(e.target.value)}
              />

              {/* Search Button */}
              <Button 
                type="primary" 
                onClick={handleSearch}
                style={{ 
                  backgroundColor: "#8D563A", 
                  width: screens.xs ? "100%" : "auto" 
                }}
              >
                Search
              </Button>
            </Space>

          </Card>

          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "20px" }}>
          <Row
              gutter={16}
              style={{ marginTop: "30px", justifyContent: "center" }}
              className="image-row"
            >
              <Col span={8}>
                <img src={"assets/Card.svg"} alt="CINI Logo" />
              </Col>
              <Col span={8}>
                <img src={"assets/Card-1.svg"} alt="CINI Logo" />
              </Col>
              <Col span={8}>
                <img src={"assets/Card-2.svg"} alt="CINI Logo" />
              </Col>
            </Row>
          </div>
          

          {/* Book Recommendations */}
          <div style={{ 
            maxWidth: "1200px", 
            margin: "20px auto", 
            overflowX: "auto" 
          }}>
            <Title level={3}>Book Recommendations</Title>
            <div className={styles.scrollable_container}>
              {homePageData.bookRecomendation.map(renderBookCard)}
            </div>
          </div>

          {/* New Releases with Tabs */}
          <div style={{ 
            maxWidth: "1200px", 
            margin: "50px auto" 
          }}>
            <Row gutter={[16, 16]}>
              {/* Sidebar */}
              <Col xs={24} md={6}>
                <Card 
                  style={{ 
                    backgroundColor: "#FFF7EC", 
                    height: "100%",
                    borderRadius: "8px" 
                  }}
                >
                  <Title level={3} style={{ color: "#333333" }}>Check Out</Title>
                  <Title level={2} style={{ color: "#FF9500" }}>
                    The New Releases
                  </Title>
                  <Text style={{ color: "#666666", fontSize: "14px" }}>
                    Discover the latest books across various genres and themes.
                  </Text>
                  <br />
                  <Link 
                    to="/new-releases" 
                    style={{ 
                      color: "#FF9500", 
                      fontWeight: "bold", 
                      fontSize: "14px" 
                    }}
                  >
                    View All
                  </Link>
                </Card>
              </Col>

              {/* Tabs and Book Cards */}
              <Col xs={24} md={18}>
                <Tabs 
                  defaultActiveKey="1" 
                  className={styles.customNewReleaseTab}
                >
                  <TabPane tab="All Books" key="1">
                    {renderBookGrid(homePageData.allBooks)}
                  </TabPane>
                  <TabPane tab="eBooks" key="2">
                    {renderBookGrid(homePageData.eBooks)}
                  </TabPane>
                  <TabPane tab="Book Listed" key="3">
                    {renderBookGrid(homePageData.listedBooks)}
                  </TabPane>
                  <TabPane tab="Issued Book" key="4">
                    {renderBookGrid(homePageData.issuedBooks)}
                  </TabPane>
                  <TabPane tab="Physical Book" key="5">
                    {renderBookGrid(homePageData.pBooks)}
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </div>

          {/* Latest eBooks */}
          <div style={{ 
            maxWidth: "1200px", 
            margin: "50px auto" 
          }}>
            <div className={styles.latest_ebook_title}>
              <Title level={3}>Latest eBooks</Title>
              <Button 
                type="link" 
                style={{ color: "#FF9500" }}
                onClick={() => navigate("/ebooks")}
              >
                View All
              </Button>
            </div>
            <div className={styles.scrollable_container}>
              {homePageData.bookRecomendation.map(renderBookCard)}
            </div>
          </div>
        </Spin>
      </Content>
    </Layout>
  );
};

export default HomeContent;