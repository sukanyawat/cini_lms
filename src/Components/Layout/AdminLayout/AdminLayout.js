import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBedPulse,
  faBook,
  faGauge,
  faList,
  faTableList,
  faUser,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Breadcrumb, Layout, Menu, message, theme } from "antd";
import styles from "./index.module.css";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const superAdminItems = [
  getItem("Dashboard", "1", <FontAwesomeIcon icon={faGauge} />),
  getItem("User Management", "2", <FontAwesomeIcon icon={faUser} />),
  getItem("Theme Management", "3", <FontAwesomeIcon icon={faList} />),
  getItem("Rack Management", "4", <FontAwesomeIcon icon={faTableList} />),
  getItem("Category Management", "5", <FontAwesomeIcon icon={faTableList} />),
  getItem("Subcategory Management", "6", <FontAwesomeIcon icon={faTableList} />),
  getItem("E-Book Management", "7", <FontAwesomeIcon icon={faBook} />),
  getItem("Physical Book Management", "8", <FontAwesomeIcon icon={faBook} />),
  getItem("EmailTemplate Management", "9", <FontAwesomeIcon icon={faEnvelope} />),
  getItem("Notification Management", "10", <FontAwesomeIcon icon={faEnvelope} />),
  getItem("User Request", "11", <FontAwesomeIcon icon={faEnvelope} />),
  getItem("Book Records", "12", <FontAwesomeIcon icon={faBook} />),
  // getItem("Admin Profile", "13", <FontAwesomeIcon icon={faUser} />),
];
const superAdminUrls = [
  "dashboard",
  "user-list",
  "theme-list",
  "rack-list",
  "category-list",
  "subcategory-list",
  "e-book-list",
  "physical-book-list",
  "emailtemplate-list",
  "send-notification",
  "user-request",
  "book-records",
  "admin-profile",
];

const breadcrumbData = [
  "Dashboard",
  "User",
  "Theme",
  "Rack",
  "Category",
  "Subcategory",
  "E Book",
  "Physical Book",
  "Email Template",
  "Send Notification",
  "User Request",
  "Book Records",
  "Profile",
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = localStorage.getItem("userType");

  const [currentMenuItem, setCurrentMenuItem] = useState("1");
  const [menuItems, setMenuItems] = useState([]);
  const [urls, setUrls] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (userType === "admin") {
      const path = location.pathname.split('/admin/');
      setCurrentMenuItem((superAdminUrls.indexOf(path[1]) + 1).toString());
      setMenuItems(superAdminItems);
      setUrls(superAdminUrls);
    }
  }, [userType]);

  const onChangeMenuItem = (data) => {
    console.log('data?.key', data?.key);
    setCurrentMenuItem(data?.key);
    navigate("/admin/" + urls[parseInt(data?.key) - 1]);
  };

  const onLogout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    message.success(`Logout Successfully!`);
    navigate("/admin");
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} 
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "rgba(108,47,44,.41)",
          width: "210px",
        }}
      >
        <div className={styles.website_logo}>
          <img
            src={"/logo_inverted.png"}
            className={styles.resize_image}
            alt="LOGO"
          ></img>
        </div>
        <Menu
          theme="dark"
          mode="vertical"
          selectedKeys={currentMenuItem}
          items={menuItems}
          onClick={onChangeMenuItem}
          style={{
            backgroundColor: "rgba(108,47,44,.41)"
          }}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header 
          // style={{ padding: 0, background: "#f5f5f5" }}
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          >
          <Row className="pt-3">
            <Col
              span={12}
              className="flex flex-row justify-start items-center pl-4"
            >
              <span className="pr-4" style={{ paddingLeft: "25px" }}>
                <p className="text-base body-font font-ubuntu">Admin Panel</p>
              </span>
            </Col>
            <Col
              span={12}
              className="flex flex-row justify-end items-center pr-4"
            >
              <span className="pr-4">
                <p
                  className="text-base body-font font-ubuntu cursor-pointer"
                  onClick={() => onLogout()}
                >
                  Logout
                </p>
              </span>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>{breadcrumbData[currentMenuItem-1]}</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 750,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright ©2024 CINI Library Management System. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
