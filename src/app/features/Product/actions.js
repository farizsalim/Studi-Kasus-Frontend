import axios from 'axios';
import {
  START_FETCHING_PRODUCT,
  ERROR_FETCHING_PRODUCT,
  SUCCESS_FETCHING_PRODUCT,
  SET_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
  SET_CATEGORY,
  TOGGLE_TAGS,
  SET_KEYWORD
} from './constans';
import config from '../../../config';

// Action to start fetching products
export const startFetchingProduct = () => ({
  type: START_FETCHING_PRODUCT,
});

// Action for successful fetching of products
export const successFetchingProduct = (data) => ({
  type: SUCCESS_FETCHING_PRODUCT,
  payload: data,
});

// Action for error during fetching of products
export const errorFetchingProduct = (error) => ({
  type: ERROR_FETCHING_PRODUCT,
  payload: error,
});

// Action to set current page
export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

// Action to go to the next page
export const nextPage = () => ({
  type: NEXT_PAGE,
});

// Action to go to the previous page
export const prevPage = () => ({
  type: PREV_PAGE,
});

// Action to set category filter
export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

// Action to toggle tags filter
export const toggleTags = (tag) => ({
  type: TOGGLE_TAGS,
  payload: tag,
});

// Action to set keyword filter
export const setKeyword = (keyword) => ({
  type: SET_KEYWORD,
  payload: keyword,
});

// Thunk action to fetch products
export const fetchProducts = () => {
    return async (dispatch, getState) => {
      dispatch(startFetchingProduct());
      
      try {
        const perPage = getState().products.perPage || 8;
        const currentPage = getState().products.currentPage || 1;
        const category = getState().products.category || '';
        const tags = getState().products.tags || [];
        const keyword = getState().products.keyword || '';
  
        // Parameters for the API request
        const params = {
          limit: perPage,
          skip: (currentPage * perPage) - perPage,
          category: category,
          tags: tags.join(','), // Assuming tags is an array
          keyword: keyword
        };
  
        // Perform the API request with parameters
        const response = await axios.get(`${config.apiHost}/api/products`, { params });
  
        dispatch(successFetchingProduct(response.data));
      } catch (error) {
        dispatch(errorFetchingProduct(error.response.data));
      }
    };
  };
