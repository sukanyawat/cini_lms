import { getUserProfile } from "../Api/Common/Login";

export const getUserProfileData = async (id, type=null) => {
    if (id) {
        try {
            const response = await getUserProfile(id);
            const resData = response?.data;
            if (type && type == "working_hours") {
                return resData?.working_hours;
            } else if (type && type == "clinic_working_hours") {
                return resData?.doctor_clinic?.doctor_clinic_clinic_working_hours;
            }  else {
                return resData;
            }
        } catch (error) {
            console.log("error", error);
            return error;
        }
    } else {
        return null;
    }
}