import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
} from "../type";
import axios from "axios";

export const login = (number) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let form_data = new FormData();
    form_data.append("Phone", number);

    const { data } = await axios.post(
      // "https://www.api-care-box.click/api/user/login/",
      "https://care-box-backend.herokuapp.com/api/user/login/",
      form_data,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('access')}`,
    //   },
    // }

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    const { data } = await axios.get(
      // "https://www.api-care-box.click/api/user/viewprofile/",
      "https://care-box-backend.herokuapp.com/api/user/viewprofile/",
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
    //console.log("get data from user ", data)
    //localStorage.setItem("name", data.user.Name);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const logout = () => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  };
  let form_data = new FormData();
  form_data.append("refresh_token", localStorage.getItem("refresh_token"));

  axios
    .post(
      // "https://www.api-care-box.click/api/user/logout/blacklist/",
      "https://care-box-backend.herokuapp.com/api/user/logout/blacklist/",
      form_data,
      config
    )
    .then((res) => {
      console.log(res);
    });
  localStorage.removeItem("userInfo");
  // localStorage.removeItem('cartItems')
  // localStorage.removeItem('shippingAddress')
  localStorage.removeItem("paymentMethod");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("name");
  localStorage.removeItem("registerd");
  dispatch({ type: USER_LOGOUT });
  // dispatch({ type: USER_DETAILS_RESET });
  // dispatch({ type: ORDER_LIST_MY_RESET });
  // dispatch({ type: USER_LIST_RESET });
  // document.location.href = "/medicine";
};

export const register = (username, number) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let form_data = new FormData();
    form_data.append("Name", username);
    form_data.append("Phone", number);

    const { data } = await axios.post(
      // "https://www.api-care-box.click/api/user/register/",
      "https://care-box-backend.herokuapp.com/api/user/register/",
      form_data,
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: USER_LOGIN_SUCCESS,
    //   payload: data,
    // })

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
