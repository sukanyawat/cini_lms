import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { Col, Layout, message, Dropdown, Menu, Space, Select, Alert } from "antd";
import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import { HomeContext } from "../../../Contexts/HomeContext";
import ChangePassword from "../../ChangePassword";
import EditProfile from "../../EditProfile";
import {
  DownOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LockOutlined,
  BookOutlined
} from "@ant-design/icons";
import {config} from "../../../Config";
import showNotification from "../../CustomNotification/CustomNotification";

const { Header, Content, Footer } = Layout;

const doctorProfileItems = [
  {
    key: "my-library",
    icon: <BookOutlined />,
    label: "My Library",
  },
  {
    key: "edit-profile",
    icon: <UserOutlined />,
    label: "Edit Profile",
  },
  {
    key: "change-password",
    icon: <LockOutlined />,
    label: "Change Password",
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
  },
];
const doctorURLs = ["home", "my-history", "my-profile"];


const CustomerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedMenuKey, setSelectedMenuKey] = useState("");
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenpassword] = useState(false);
  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);

  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const items = doctorProfileItems;
  

  useEffect(() => {
    highlightMenu(doctorURLs);
  }, [location?.pathname]);

  const highlightMenu = (urlArr) => {
    if (urlArr.includes(location?.pathname.substring(1))) {
      const menuIndex = String(
        urlArr.findIndex((item) => item === location?.pathname.substring(1)) + 1
      );
      setSelectedMenuKey(menuIndex);
    } else setSelectedMenuKey("");
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const doctorHeaderMenuItems = [
    getItem("Home", "1"),
    getItem("My History", "2"),
    getItem("My Profile", "3")
  ];

  const onClick = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      localStorage.clear();
      navigate("/");
      message.success(`Logout Successfully!`);
    } else if (key === "edit-profile") {
      setOpenProfileDrawer(true);
    } else if (key === "change-password"){
      setOpenpassword(true);
    }else {
      navigate("/" + key);
    }
  };
  
  const changeMenuItem = (key) => {
    const matchIUrls = doctorURLs;
    navigate("/" + matchIUrls[parseInt(key) - 1]);
  };

  const onChangePassword=()=>{
    setOpenpassword(false)
  }

  const closeProfileDrawer=()=>{
    setOpenProfileDrawer(false)
  }
 

  return (
    <>
      <HomeContext.Provider value={{}}>
        <Layout style={{ minHeight: "100vh" }} className="layout">
          <Layout>
            <Header
              style={{
                padding: 0,
                background: "#fef4e6",
                boxShadow: "0px 4px 4px #ECECF1",
                paddingTop:'15px',
                paddingBottom:'15px',
                height:'100px',
                paddingLeft: '100px',
                paddingRight: '100px',
              }}
            >
              <Col
                className="flex flex-row justify-between items-center pl-4 container"
                style={{
                  margin: "0 auto"
                }}
                span={24}
              >
                <div className="flex flex-row items-center">
                  <Link to="/home" className="pr-2">
                  <img src={"assets/cini-login.png"} alt="CINI Logo" className={styles.resize_image} />
                  </Link>
                  {/* <span
                    className={`pr-2 ${
                      userType === "patient" && "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (userType === "patient") {
                        navigate("/home");
                        setSelectedMenuKey("");
                      }
                    }}
                  >
                    <img src={"assets/cini-login.png"} alt="CINI Logo" className={styles.resize_image} />
                  </span> */}
                  {/* <span className="pr-2">
                    <Menu
                      mode="horizontal"
                      selectedKeys={[selectedMenuKey]}
                      disabledOverflow={true}
                      items={doctorHeaderMenuItems}
                      onClick={(event) => changeMenuItem(event.key)}
                      className={styles.menu}
                    />
                  </span> */}
                </div>

                <div className="flex flex-row" style={{height:"60px"}}>
                  <span className="pr-2">
                    <Dropdown
                      menu={{
                        items,
                        onClick,
                      }}
                      placement="bottomRight"
                      arrow
                    >
                      <Space>
                      <img
                          src={config.API_BASE_URL+'/' +localStorage.getItem('userImage')}
                          alt="calender img"
                          className={styles.person}
                        ></img>
                        <span className={styles.userName}>{localStorage.getItem('username')}</span>
                        <DownOutlined />
                      </Space>
                    </Dropdown>
                  </span>
                </div>
              </Col>
            </Header>
            <Content style={{ backgroundColor:'#fffaf3', width:'100%'}}>
              <div
                style={{
                  paddingTop: 24,
                  minHeight: 560,
                }}
              >
                <Outlet />
              </div>
            </Content>
            <Footer
              style={{ textAlign: "center", padding: "10px 0px 0px 0px" }}
            >
              <footer className={styles.footer}>
                
                <div className={`container ${styles.footerBottom}`}>
                  <img
                    className={styles.logo}
                    src={"/logo_inverted.png"}
                    alt="LOGO"
                  />
                  <p>Copyright ©2024 CINI. All rights reserved.</p>
                </div>
              </footer>
            </Footer>
          </Layout>
        </Layout>
      </HomeContext.Provider>
      <ChangePassword onClose={onChangePassword} open={openPassword}/>
      <EditProfile onClose={closeProfileDrawer} open={openProfileDrawer}/>
    </>
  );
};

export default CustomerLayout;
