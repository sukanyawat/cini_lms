import API from "../ApiClient/apiClient";
import { ROUTES_URL } from "../Constant/Constant";

export const userLogin = (payload) => {
  return API.post(ROUTES_URL.LOGIN, payload);
};

export const userRegistration = (payload) => {
  return API.post(ROUTES_URL.SIGNUP, payload);
};

export const userUpdateProfile = (id, payload) => {
  return API.put(ROUTES_URL.UPDATE_PROFILE+id, payload);
};

export const deleteUser = (id) => {
  return API.delete(ROUTES_URL.DELETE_USER+id);
};

export const getUserProfile = (id) => {
  return API.get(ROUTES_URL.UPDATE_PROFILE+id);
};

export const UserFileUpload = (id, payload) => {
  return API.post(ROUTES_URL.FILE_UPLOAD+id+"?relation_type=id_proof", payload);
};

export const UserFileDownload = (id) => {
  return API.get(ROUTES_URL.FILE_DOWNLOAD+id+"?relation_type=id_proof");
};

export const UserSignatureUpload = (id, payload) => {
  return API.post(ROUTES_URL.FILE_UPLOAD+id+"?relation_type=signature", payload);
};

export const userChangePassword =(payload)=>{
  return API.put(ROUTES_URL.CHANGE_PASSWORD,payload)
}

export const userOnBoard = (payload) => {
  return API.post(ROUTES_URL.ONBOARD, payload);
};