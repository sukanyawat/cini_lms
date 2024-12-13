import React from "react";
import DoctorsContent from "../../Components/DoctorsContent/DoctorsContent";

const MyProfile = () => {
  const userType = localStorage.getItem("userType");
  return (
    <div>
        <DoctorsContent />
    </div>
  );
};

export default MyProfile;
