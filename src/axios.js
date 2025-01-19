import axios from "axios";

export const axiosGet = async (url) => {
  const baseUrl = "https://lakahdatarbackend.onrender.com";
  let getdata = await axios.get(`${baseUrl}/${url}`).catch((error) => {
    return error;
  });
  if (getdata) {
    return getdata;
  }
};
export const axiosPost = async (url, data) => {
  const baseUrl = "https://lakahdatarbackend.onrender.com";
  let postdata = await axios.post(`${baseUrl}/${url}`, data).catch((error) => {
    return error;
  });
  if (postdata) {
    return postdata;
  }
};
