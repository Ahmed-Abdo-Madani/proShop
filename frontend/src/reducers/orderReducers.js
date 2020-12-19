import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  LOGGED_USER_ORDERS_REQUEST,
  LOGGED_USER_ORDERS_SUCCESS,
  LOGGED_USER_ORDERS_FAIL,
  LOGGED_USER_ORDERS_RESET,
  ADMIN_ORDERS_LIST_REQUEST,
  ADMIN_ORDERS_LIST_SUCCESS,
  ADMIN_ORDERS_LIST_FAIL,
  ADMIN_ORDERS_LIST_RESET,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };

    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };

    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };

    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };

    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };

    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };

    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const userOrdersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case LOGGED_USER_ORDERS_REQUEST:
      return { loading: true, orders: [] };

    case LOGGED_USER_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };

    case LOGGED_USER_ORDERS_FAIL:
      return { loading: false, error: action.payload };

    case LOGGED_USER_ORDERS_RESET:
      return { orders: [] };

    default:
      return state;
  }
};

export const adminOrdersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_ORDERS_LIST_REQUEST:
      return { loading: true, orders: [] };

    case ADMIN_ORDERS_LIST_SUCCESS:
      return { loading: false, orders: action.payload };

    case ADMIN_ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };

    case ADMIN_ORDERS_LIST_RESET:
      return { orders: [] };

    default:
      return state;
  }
};
