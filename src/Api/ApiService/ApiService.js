import axiosInstance from '../ApiClient/apiClient';

export const getApiCall = (url, auth = false) => {
  if (auth) {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem("admin-token")
    }
    return axiosInstance.get(url, {
      headers: headers
    });
  } else {
    return axiosInstance.get(url);
  }
}

export const postApiCall = (url, payload, auth = false) => {
  if (auth) {
    console.log(localStorage.getItem("admin-token"),"234567");
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem("admin-token")
    }
    return axiosInstance.post(url, payload, {
      headers: headers
    });
  } else {
    return axiosInstance.post(url, payload);
  }
}

export const clientPostApiCall = (url, payload, auth = false) => {
  if (auth) {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
    return axiosInstance.post(url, payload, {
      headers: headers
    });
  } else {
    return axiosInstance.post(url, payload);
  }
}

export const putApiCall = (url, payload, auth = false) => {
  if (auth) {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem("admin-token")
    }
    return axiosInstance.put(url, payload, {
      headers: headers
    });
  } else {
    return axiosInstance.put(url, payload);
  }
}

export const deleteApiCall = (url) => {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem("admin-token")
    }
    return axiosInstance.delete(url, {
      headers: headers
    });
}