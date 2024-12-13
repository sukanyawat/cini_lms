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
// import styles from "./index.module.css";
import { PlusOutlined, MinusOutlined, LoadingOutlined, LikeOutlined, StarOutlined, MessageOutlined } from '@ant-design/icons';
import { getApiCall, postApiCall } from "../../Api/ApiService/ApiService";
import { ROUTES_URL } from "../../Api/Constant/Constant";
import { config } from "../../Config";

const { Sider, Content } = Layout;
const { Option } = Select;
const { Panel } = Collapse;
const { Title, Text } = Typography;


const BookList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialData = location.state || null;

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [propsData, setPropsData] = useState(initialData);
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState(initialData?.keyword || null);
  const [themeList, setThemeList] = useState([]);
  const [themeId, setThemeId] = useState(initialData?.themeId || null);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || null);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [subcategoryId, setSubcategoryId] = useState(initialData?.subcategoryId || null);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedBookTypes, setSelectedBookTypes] = useState([]);

  const [paginationData, setPaginationData] = useState({
    currentPage: 0,
    itemsPerPage: 5,
    totalItems: null,
    totalPages: null
  });

  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    latitude: null,
    longitude: null,
    name: "",
  });


  const filterData = {
    Authors: [
      { name: "Gopal Pal", count: 5 },
      { name: "Matt Ridley", count: 9 },
      { name: "Morgan Housel", count: 15 },
      { name: "John Doe", count: 7 },
      { name: "NHM", count: 5 },
      { name: "Sri Harsha", count: 8 },
    ],
    bookTypes: [
      { name: "Physical Book", count: 5 },
      { name: "E-Book", count: 9 }
    ]
  };

  useEffect(() => {
    getThemeList();
    getAllBooks();

  }, [])

  useEffect(() => {
    if (categoryId && categoryId != '') {
      getCategoryList(themeId)
    }

    if (subcategoryId && subcategoryId != '') {
      getSubcategoryList(categoryId)
    }

    getThemeList();
    getAllBooks();

  }, [])


  const handleAuthorChange = (checked, authorName) => {
    setSelectedAuthors(prevState =>
      checked ? [...prevState, authorName] : prevState.filter(item => item !== authorName)
    );
  };

  const handleBookTypeChange = (checked, bookTypeName) => {
    setSelectedBookTypes(prevState =>
      checked ? [...prevState, bookTypeName] : prevState.filter(item => item !== bookTypeName)
    );
  };

  const getAllBooks = async () => {
    try {
      setLoading(true);
      const payload = {
        themeId: themeId,
        categoryId: categoryId,
        subcategoryId: subcategoryId,
        keyword: keyword,
        limit: paginationData.itemsPerPage,
        page: paginationData.currentPage
      }
      const response = await postApiCall(ROUTES_URL.WEB_SEARCHPAGE_LIST_URL, payload);
      if (response) {
        setLoading(false);
        setBooks(response?.data.data.books);
        setPaginationData(response?.data.data.pagination);
      }
    } catch (err) {
      setLoading(false);
      console.log('Error => ', err);
    }
  };

  const getThemeList = async () => {
    try {
      const response = await getApiCall(ROUTES_URL.WEB_THEME_LIST_URL, true);
      if (response) {
        setThemeList(response?.data.data);
      }
    } catch (err) {
      console.log('Error => ', err);
    }
  };

  const getCategoryList = async (id) => {
    try {
      const response = await getApiCall(`${ROUTES_URL.WEB_CATEGORY_LIST_URL}?themeid=${id}`, true);
      if (response) {
        setCategoryList(response?.data.data);
      }
    } catch (err) {
      console.log('Error => ', err);
    }
  };

  const getSubcategoryList = async (id) => {
    try {
      const response = await getApiCall(`${ROUTES_URL.WEB_SUBCATEGORY_LIST_URL}?categoryid=${id}`, true);
      if (response) {
        setSubcategoryList(response?.data.data);
      }
    } catch (err) {
      console.log('Error => ', err);
    }
  };

  const handleChangeTheme = (val) => {
    setThemeId(val);
    getCategoryList(val);
  }

  const handleChangeCategory = (val) => {
    setCategoryId(val);
    getSubcategoryList(val);
  }

  const handleChangeSubcategory = (val) => {
    setSubcategoryId(val);
  }

  const handleSearch = async () => {
    getAllBooks();
  }

  const customExpandIcon = ({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />;

  const handleThemeChange = (checkedValues) => {
    setSelectedThemes(checkedValues);
  };

  // Handle filter changes
  const handleCategoryChange = (e) => {
    console.log('checkedValues', selectedCategories);
    if (e.target.checked) {
      setSelectedCategories(e.target.value);
    } else {
      setSelectedCategories("")
    }

  };

  const handleSubcategoryChange = (checkedValues) => {
    setSelectedSubcategories(checkedValues);
  };

  // Handle pagination change
  const handlePaginationChange = (page) => {
    setPaginationData({ ...paginationData, currentPage: page })
  };

  const handleResetFields = () => {
    setPropsData(null)
    setThemeId(null);
    setCategoryId(null);
    setSubcategoryId(null);
    setKeyword(null);
    handleSearch();
  }

  const handleSendRequest = (item) => {
    console.log(item);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  // return (
  //   <>
  //     <div style={{ background: 'rgb(250, 245, 240)' }}>
  //       <div className="container" style={{ margin: '0 auto' }}>
  //         <Spin spinning={loading}>
  //           <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
  //             <Breadcrumb
  //               items={[
  //                 {
  //                   title: "Home"
  //                 },
  //                 {
  //                   title: "Book List"
  //                 }
  //               ]}
  //             >
  //             </Breadcrumb>
  //           </div>

  //           <Title style={{ color: "#5A2A27", textAlign: "center" }}>What are you looking for at the library</Title>

  //           <div
  //             className="container"
  //             style={{ margin: "0 auto", paddingTop: "20px" }}
  //           >
  //             <Card
  //               style={{
  //                 marginTop: "20px",
  //                 marginBottom: "10px",
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
  //                   style={{ width: "295px" }}
  //                   value={themeId}
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
  //                   style={{ width: "295px" }}
  //                   onChange={handleChangeCategory}
  //                   value={categoryId}
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
  //                   style={{ width: "295px" }}
  //                   onChange={handleChangeSubcategory}
  //                   value={subcategoryId}
  //                 >
  //                   {
  //                     subcategoryList.length > 0 && subcategoryList.map((subcategory) => {
  //                       return <Option value={subcategory._id}>{subcategory.categoryName}</Option>
  //                     })
  //                   }
  //                 </Select>
  //                 <Input
  //                   placeholder="Find the book you like..."
  //                   value={keyword}
  //                   style={{ width: "370px", border: "none", boxShadow: "none" }}
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
  //                 <Button
  //                   type="primary"
  //                   style={{
  //                     backgroundColor: "#ff4d4f",
  //                     borderColor: "#ff4d4f",
  //                     borderRadius: "4px",
  //                     padding: "0 20px",
  //                     height: "40px",
  //                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  //                   }}
  //                   onClick={handleResetFields}
  //                 >
  //                   Reset
  //                 </Button>
  //               </Space>
  //             </Card>
  //           </div>

  //           <Layout style={{ minHeight: '100vh', marginTop: '10px' }}>

  //             <Sider className="" width={350} style={{ background: 'rgb(250, 245, 240)', padding: '20px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
  //               <Title level={4} className="text-center">Related Searches</Title>
  //               <Collapse className="filter-collapse" defaultActiveKey={['1']} expandIcon={customExpandIcon} expandIconPosition="end" bordered={false} style={{ background: 'rgb(250, 245, 240)' }}>
  //                 <Panel className="" header="Subject" key="1">
  //                   <List
  //                     dataSource={filterData.Subject}
  //                     renderItem={item => (
  //                       <List.Item>
  //                         <Text>{item.name} ({item.count})</Text>
  //                       </List.Item>
  //                     )}
  //                   />
  //                 </Panel>
  //                 <Panel className="" header="Authors" key="2">
  //                   <List
  //                     dataSource={filterData.Authors}
  //                     renderItem={item => (
  //                       <List.Item>
  //                         <Text>{item.name} ({item.count})</Text>
  //                       </List.Item>
  //                     )}
  //                   />
  //                 </Panel>
  //                 <Panel className="" header="Series" key="3">
  //                   {/* Series List */}
  //                 </Panel>
  //                 <Panel className="" header="Keywords" key="4">
  //                   {/* Keywords List */}
  //                 </Panel>
  //               </Collapse>

  //               <Title level={4} className="text-center" style={{ marginTop: '20px' }}>Narrow your search</Title>
  //               <Collapse className="filter-collapse" expandIcon={customExpandIcon} expandIconPosition="end" bordered={false}>
  // <Panel className="" header="Type of Material" key="1">
  //   <List
  //     dataSource={filterData2.Subject}
  //     renderItem={item => (
  //       <List.Item>
  //         <Text>{item.name} ({item.count})</Text>
  //       </List.Item>
  //     )}
  //   />
  // </Panel>
  // <Panel className="" header="Publishing Date" key="2">
  //   <List
  //     dataSource={filterData2.Authors}
  //     renderItem={item => (
  //       <List.Item>
  //         <Text>{item.name} ({item.count})</Text>
  //       </List.Item>
  //     )}
  //   />
  // </Panel>
  // <Panel className="" header="Popularity" key="3">
  //   {/* Series List */}
  // </Panel>
  // <Panel className="" header="Language" key="4">
  //   {/* Keywords List */}
  // </Panel>
  //               </Collapse>

  //             </Sider>

  //             <Layout>
  //               <Content style={{ background: 'rgb(250, 245, 240)', paddingLeft: '20px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
  //                 {
  //                   !loading ?
  //                 <List
  //                   itemLayout="vertical"
  //                   size="large"
  //                   dataSource={books}
  //                   renderItem={(item) => (
  //                     <List.Item key={item.bookName}>
  //                       <div style={{ display: 'flex' }}>
  //                         {/* Left-aligned image */}
  //                         <div
  //                           style={{
  //                             height: '350px',
  //                             width: '270px'
  //                           }}
  //                         >
  //                           <Link to={"/book-list/"+item.bookSlug}>
  //                           <img
  //                             src={config.API_BASE_URL + item.coverImage}
  //                             alt={item.bookName}
  //                             style={{
  //                               // height: '350px',
  //                               width: '100%',
  //                               objectFit: 'cover',
  //                               // marginRight: 20
  //                             }}
  //                           />
  //                           </Link>
  //                         </div>

  //                         {/* Content */}
  //                         <div className="w-full" style={{ marginLeft: '20px' }}>
  //                           <List.Item.Meta
  //                             title={<Link to={item.bookSlug}><Text style={{ fontSize: '18px' }} strong>{item.bookName}</Text></Link>}
  //                             description={
  //                               <div>
  //                                 <Text><strong>Theme:</strong> {item.themeId ? item.themeId.themeTitle : null}</Text><br />
  //                                 <Text><strong>Category:</strong> {item.categoryId ? item.categoryId.categoryName : null}</Text><br />
  //                                 <Text><strong>Subcategory:</strong> {item.subcategoryId ? item.subcategoryId.categoryName : null}</Text><br />
  //                                 <Text><strong>Author:</strong> {item.autherName ? item.autherName : null}</Text><br />
  //                                 <Text><strong>ISBN:</strong> {item.bookNumber ? item.bookNumber : null}</Text><br />
  //                                 <Text>{item.bookDescription ? item.bookDescription : null}</Text>
  //                               </div>
  //                             }
  //                           />
  //                         </div>
  //                       </div>
  //                     </List.Item>
  //                   )}
  //                 />
  //                 : null }

  //                 {/* Pagination Component */}
  //                 <Pagination
  //                   current={paginationData.currentPage + 1}
  //                   total={paginationData.totalPages}
  //                   pageSize={2}
  //                   onChange={handlePaginationChange}
  //                   style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}
  //                 />
  //               </Content>

  //             </Layout>
  //           </Layout>

  //         </Spin>
  //       </div>
  //     </div>

  //     <Modal
  //       title="Send Request for Book"
  //       open={open}
  //       onCancel={onClose}
  //       maskClosable={false}
  //       footer={null}
  //     >
  //       <Form layout="vertical">
  //         <Col>
  //           <Form.Item
  //             name="dateTime"
  //             label="Date"
  //             rules={[
  //               {
  //                 required: true,
  //                 message: 'Please choose the date',
  //               },
  //             ]}
  //           >
  //             <DatePicker.RangePicker
  //               style={{
  //                 width: '100%',
  //               }}
  //               getPopupContainer={(trigger) => trigger.parentElement}
  //             />
  //           </Form.Item>
  //         </Col>

  //         <Col>
  //           <Form.Item
  //             name="description"
  //             label="Description"
  //             rules={[
  //               {
  //                 required: true,
  //                 message: 'please enter comment',
  //               },
  //             ]}
  //           >
  //             <Input.TextArea rows={4} placeholder="please enter comment" />
  //           </Form.Item>
  //         </Col>
  //         <Col>
  //           <Space>
  //             <Button onClick={onClose}>Cancel</Button>
  //             <Button onClick={onClose} type="primary">
  //               Submit
  //             </Button>
  //           </Space>
  //         </Col>
  //       </Form>
  //     </Modal>
  //   </>
  // );




  return (
    <>
      <div className="bg-[rgb(250,245,240)] min-w-full">
        <div className="container mx-auto px-4">
          <Spin spinning={loading}>
            <div className="flex justify-center mb-5">
              <Breadcrumb
                items={[
                  { title: "Home" },
                  { title: "Book List" }
                ]}
              />
            </div>

            <Title
              className="text-center text-2xl md:text-3xl lg:text-4xl"
              style={{ color: "#5A2A27" }}
            >
              What are you looking for at the library
            </Title>

            <div className="container mx-auto pt-5">
              <Card
                className="mt-5 mb-3 w-full shadow-md rounded-lg"
                bodyStyle={{ padding: "10px" }}
              >
                <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
                  <Select
                    placeholder="By All Themes"
                    bordered={false}
                    className="w-full md:w-1/4"
                    value={themeId}
                    onChange={handleChangeTheme}
                  >
                    {themeList.length > 0 && themeList.map((theme) => (
                      <Option key={theme._id} value={theme._id}>
                        {theme.themeTitle}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    placeholder="By Categories"
                    bordered={false}
                    className="w-full md:w-1/4"
                    onChange={handleChangeCategory}
                    value={categoryId}
                  >
                    {categoryList.length > 0 && categoryList.map((category) => (
                      <Option key={category._id} value={category._id}>
                        {category.categoryName}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    placeholder="By Sub-categories"
                    bordered={false}
                    className="w-full md:w-1/4"
                    onChange={handleChangeSubcategory}
                    value={subcategoryId}
                  >
                    {subcategoryList.length > 0 && subcategoryList.map((subcategory) => (
                      <Option key={subcategory._id} value={subcategory._id}>
                        {subcategory.categoryName}
                      </Option>
                    ))}
                  </Select>
                  <Input
                    placeholder="Find the book you like..."
                    value={keyword}
                    className="w-full md:w-1/4 border-none shadow-none"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Button
                      type="primary"
                      className="bg-[#8D563] border-[#8D563A] rounded-md px-4 py-2 shadow-md"
                      style={{
                        backgroundColor: "#8D563A",
                        borderColor: "#8D563A"
                      }}
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                    <Button
                      type="primary"
                      className="bg-[#ff4d4f] border-[#ff4d4f] rounded-md px-4 py-2 shadow-md"
                      style={{
                        backgroundColor: "#ff4d4f",
                        borderColor: "#ff4d4f"
                      }}
                      onClick={handleResetFields}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex flex-col md:flex-row min-h-screen mt-3">
              <div
                className="w-full md:w-80 lg:w-96 p-5 bg-[rgb(250,245,240)] shadow-lg"
              >
                <Title level={4} className="text-center">Related Searches</Title>
                <Collapse
                  className="filter-collapse"
                  defaultActiveKey={['1']}
                  expandIcon={customExpandIcon}
                  expandIconPosition="end"
                  bordered={false}
                  style={{ background: 'rgb(250, 245, 240)' }}
                >
                  {/* Existing Collapse Panels */}
                  <Panel className="" header={<span style={{ fontWeight: 'bold' }}>Authors</span>} key="1">
                    <List
                      dataSource={filterData.Authors}
                      renderItem={item => (
                        <List.Item>
                          <Text>{item.name} ({item.count})</Text>
                          <Checkbox
                            checked={selectedAuthors.includes(item.name)}
                            onChange={e => handleAuthorChange(e.target.checked, item.name)}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                  <Panel className="" header={<span style={{ fontWeight: 'bold' }}>Book Type</span>} key="2">
                    <List
                      dataSource={filterData.bookTypes}
                      renderItem={item => (
                        <List.Item>
                          <Text>{item.name} ({item.count})</Text>
                          <Checkbox
                            checked={selectedBookTypes.includes(item.name)}
                            onChange={e => handleBookTypeChange(e.target.checked, item.name)}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                  {/* Other panels remain the same */}
                </Collapse>
              </div>

              <div className="flex-1 bg-[rgb(250,245,240)] p-5 shadow-lg">
                {!loading && (
                  <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={books}
                    renderItem={(item) => (
                      <List.Item key={item.bookName}>
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-72 mb-4 md:mb-0 md:mr-5">
                            <Link to={"/book-list/" + item.bookSlug}>
                              <img
                                src={config.API_BASE_URL + item.coverImage}
                                alt={item.bookName}
                                className="w-full h-auto object-cover"
                              />
                            </Link>
                          </div>

                          <div className="w-full">
                            <List.Item.Meta
                              title={
                                <Link to={item.bookSlug}>
                                  <Text className="text-lg font-bold">
                                    {item.bookName}
                                  </Text>
                                </Link>
                              }
                              description={
                                <div>
                                  <Text><strong>Theme:</strong> {item.themeId?.themeTitle}</Text><br />
                                  <Text><strong>Category:</strong> {item.categoryId?.categoryName}</Text><br />
                                  <Text><strong>Subcategory:</strong> {item.subcategoryId?.categoryName}</Text><br />
                                  <Text><strong>Author:</strong> {item.autherName}</Text><br />
                                  <Text><strong>ISBN:</strong> {item.bookNumber}</Text><br />
                                  <Text>{item.bookDescription}</Text>
                                </div>
                              }
                            />
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                )}

                <Pagination
                  current={paginationData.currentPage + 1}
                  total={paginationData.totalPages}
                  pageSize={2}
                  onChange={handlePaginationChange}
                  className="mt-5 mb-5 text-center"
                />
              </div>
            </div>
          </Spin>
        </div>
      </div>

      <Modal
        title="Send Request for Book"
        open={open}
        onCancel={onClose}
        maskClosable={false}
        footer={null}
      >
        <Form layout="vertical">
          <Col>
            <Form.Item
              name="dateTime"
              label="Date"
              rules={[
                {
                  required: true,
                  message: 'Please choose the date',
                },
              ]}
            >
              <DatePicker.RangePicker
                className="w-full"
                getPopupContainer={(trigger) => trigger.parentElement}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'please enter comment',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter comment"
              />
            </Form.Item>
          </Col>
          <Col>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </Space>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default BookList;
