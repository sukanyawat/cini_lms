import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import WarningOutlined from "@ant-design/icons/WarningOutlined";
import ExclamationCircleOutlined from "@ant-design/icons/ExclamationCircleOutlined";
import InfoCircleOutlined from "@ant-design/icons/InfoCircleOutlined";
import notification from "antd/es/notification";

const showNotification = ({ type, description }) => {
  notification.destroy();

  let config = { placement: "topRight", description: description, duration: 3 };
  if (type === "success") {
    return notification.success({
      ...config,
      message: <span style={{ color: "#2F855A" }}>Success</span>,
      icon: <CheckCircleOutlined style={{ color: "#2F855A" }} />,
    });
  } else if (type === "error") {
    return notification.error({
      ...config,
      message: <span style={{ color: "#C53030" }}>Error</span>,
      icon: <WarningOutlined style={{ color: "#C53030" }} />,
    });
  } else if (type === "warning") {
    return notification.error({
      ...config,
      message: <span style={{ color: "#C05621" }}>Warning</span>,
      icon: <ExclamationCircleOutlined style={{ color: "#C05621" }} />,
    });
  } else {
    return notification.error({
      ...config,
      message: <span style={{ color: "#2B6CB0" }}>Info</span>,
      icon: <InfoCircleOutlined style={{ color: "#2B6CB0" }} />,
    });
  }
};

export default showNotification;
