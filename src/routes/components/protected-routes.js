import React from "react";
import { Route } from "react-router-dom";
import CustomerLayout from "../../Components/Layout/CustomerLayout/CustomerLayout";

import PageNotFound from "../../Components/PageNotFound/PageNotFound";
import AdminLayout from "../../Components/Layout/AdminLayout/AdminLayout";
import Home from "../../Pages/Home/Home";

// Admin routes
import DashboardManagement from "../../Pages/Admin/DashboardManagement";
import UserManagement from "../../Containers/Admin/User";
import ThemeManagement from "../../Containers/Admin/Theme";
import RackManagement from "../../Containers/Admin/Rack";
import CategoryManagement from "../../Containers/Admin/Category";
import EBookManagement from "../../Containers/Admin/EBooks";
import PBookManagement from "../../Containers/Admin/PBooks";
import EmailTemplateManagement from "../../Containers/Admin/EmailTemplate";
import SendNotificationManagement from "../../Containers/Admin/SendNotification";
import UserRequestManagement from "../../Containers/Admin/UserRequest";
import SubcategoryManagement from "../../Containers/Admin/Subcategory";
import BookRecordsManagement from "../../Containers/Admin/BookRecords";
import BookList from "../../Components/BookList/BookList";
import BookDetails from "../../Components/BookDetails/BookDetails";
import MyLibrary from "../../Components/MyLibrary/MyLibrary";


const ProtectedRoutes = () => {  
  const userType = localStorage.getItem("userType");

  return (
    <>
      {userType === "customer" ? (
        <Route element={<CustomerLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="book-list" element={<BookList/>}/>
          <Route path="book-list/:slug" element={<BookDetails/>}/>
          <Route path="my-library" element={<MyLibrary/>}/>
        </Route>
      ) : userType === "admin" ? (
        <Route element={<AdminLayout />}>
          <Route path="admin/dashboard" element={<DashboardManagement />} />
          <Route path="admin/user-list" element={<UserManagement />} />
          <Route path="admin/theme-list" element={<ThemeManagement />} />
          <Route path="admin/rack-list" element={<RackManagement />} />
          <Route path="admin/category-list" element={<CategoryManagement />} />
          <Route path="admin/e-book-list" element={<EBookManagement />} />
          <Route path="admin/physical-book-list" element={<PBookManagement />} />
          <Route path="admin/emailtemplate-list" element={<EmailTemplateManagement />} />
          <Route path="admin/send-notification" element={<SendNotificationManagement />} />
          <Route path="admin/user-request" element={<UserRequestManagement />} />
          <Route path="admin/subcategory-list" element={<SubcategoryManagement />} />
          <Route path="admin/book-records" element={<BookRecordsManagement />} />
          
        </Route>
      ) : (
        <Route path="*" element={<PageNotFound />} />
      )}
    </>
  );
};

export default ProtectedRoutes;
