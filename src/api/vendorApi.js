import { VendorEndPoints } from "../utils/baseUrl";
import { axiosRequest } from "./axiosInstance";

export const getDashBoard = async () => {
  try {
    const res = await axiosRequest("vendor", "GET", VendorEndPoints.dashboard);
    if (res.success) {
      return res.data?.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getrecentOrders = async () => {
  try {
    const res = await axiosRequest(
      "vendor",
      "get",
      VendorEndPoints.recentOrders
    );
    if (res.success) {
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const totalOrders = async (data) => {
  try {
    const res = await axiosRequest(
      "vendor",
      "post",
      VendorEndPoints.totalorders,
      data
    );
    if (res.success) {
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};
