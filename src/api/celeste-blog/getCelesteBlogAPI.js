import axios from "axios";
const getCelesteBlogAPI = async () => {
  const api = axios.create({
    baseURL: "http://34.215.183.209/wp-json/wp/v2/",
  });
  return api;
};
export default getCelesteBlogAPI;
