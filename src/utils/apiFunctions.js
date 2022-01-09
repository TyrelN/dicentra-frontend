import { api } from "../boot/axios";
import alert from "./alert";
const options = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
export const apiCall = async (
  method,
  url,
  data = {},
  containsImage = false
) => {
  try {
    return await api.request({
      method: method,
      url: url,
      data: data,
      headers: containsImage
        ? {
            "Content-Type": "multipart/form-data",
          }
        : {},
    });
  } catch (error) {
    if (error.response.status==400) {
      return error.response;
    } else {
      alert(error.message, "red-5", "primary");
    }
  }
};
