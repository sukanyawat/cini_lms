import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./public-routes";
import ProtectedRoutes from "./protected-routes";
import PageNotFound from "../../Components/PageNotFound/PageNotFound";

const PageRouter = () => {
  return (
    <Routes>
      {ProtectedRoutes()}
      {PublicRoutes()}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PageRouter;
