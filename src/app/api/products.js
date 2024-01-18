import axios from "axios";
import config  from "../../config";

export const getProduct = async (params) => {
  return await axios.get(`${config.apiHost}/api/products`, { params });
};

export const getCategories = async () => {
  return await axios.get(`${config.apiHost}/api/categories`);
};

export const getTagsByCategory = async (category) => {
  return await axios.get(`${config.apiHost}/api/tags/${category}`);
};
