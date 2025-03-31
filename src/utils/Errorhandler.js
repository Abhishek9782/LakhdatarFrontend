import { toast } from "react-toastify";

export const ErrorHandler = (res) => {
  if (res.response.data) {
    toast.error(res.response?.data.message);
  } else {
    toast.error("Somthing Went Wrong ");
  }
};
