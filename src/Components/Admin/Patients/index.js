import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import {
  Button,
  Divider,
} from "antd";


const Dashboard = () => {


  return (
    <>
    <div className={styles.container}>
      <div className={styles.flex_container}>
        <p className={styles.title}>Dashboard</p>
        
      </div>
      <Divider />
      
    </div>
    
</>
  );
};

export default Dashboard;
