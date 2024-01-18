import { ADD_ITEM, CLEAR_ITEM, REMOVE_ITEM, SET_ITEM } from "./constans";

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: {
    item: {
      ...item,
      product: item.product || item
    }
  }
});

export const removeItem = (item) => ({
  type: REMOVE_ITEM,
  payload: {
    item: item
  }
});

export const clearItem = () => ({
  type: CLEAR_ITEM
});

export const setItem = (item) => ({
  type: SET_ITEM,
  payload: {
    item: {
      ...item,
      product: item.product || item
    }
  }
});
