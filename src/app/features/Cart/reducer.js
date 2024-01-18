import { ADD_ITEM, REMOVE_ITEM, SET_ITEM, CLEAR_ITEM } from './constans';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_ITEM:
      // Logika penambahan item
      if (state.find(item => item._id === payload.item._id)) {
        return state.map(item => ({
          ...item,
          qty: item._id === payload.item._id ? item.qty + 1 : item.qty
        }));
      } else {
        return [...state, { ...payload.item, qty: 1 }];
      }

    case REMOVE_ITEM:
      // Logika pengurangan item
      return state
        .map(item => ({
          ...item,
          qty: item._id === payload.item._id ? item.qty - 1 : item.qty
        }))
        .filter(item => item.qty > 0);

    case SET_ITEM:
      // Logika penanganan set item
      return state.map(item => ({
        ...item,
        qty: item._id === payload.item._id ? payload.item.qty : item.qty
      }));

    case CLEAR_ITEM:
      return [];

    default:
      return state;
  }
}
