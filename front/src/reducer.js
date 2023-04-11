export const REMOVE = 'REMOVE';
export const CLEAR_CART = 'CLEAR_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_TOTALS = 'GET_TOTALS';
export const CHANGE_VALUE = 'CHANGE_VALUE'
export const ADD_CONFIRM = 'ADD_CONFIRM'

const initialStore = {
  cart: JSON.parse(localStorage.getItem('products')) || [],
  total: 0,
  confirmationInfo: {}
};

const reducer = (state = initialStore, action) => {
  if (action.type === ADD_TO_CART) {
    let addedItem = state.cart.find((item) => item.id === action.payload.id);
    if (!addedItem) {
      const cartItem = {
        id: action.payload.id,
        quantity: 1,
      };
      return {
        ...state,
        cart: [...state.cart, cartItem],
      };
    } else {
      const tempCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });
      return {
        ...state,
        cart: tempCart,
      };
    }
  }

  if (action.type === CHANGE_VALUE) {
    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.record.id) {
        cartItem = {
          ...cartItem,
          quantity: action.payload.value,
          itemTotalPrice: parseFloat(
            (action.payload.value * action.payload.record.price).toFixed(2)
          ),
        };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
    };
  }

  if (action.type === ADD_CONFIRM) {
    return {...state, confirmationInfo: action.payload}
  }

  return state;
};

export default reducer;
