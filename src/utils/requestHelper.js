import { getDataLocalStorage } from "./localStorageHelper";
import { axiosGet } from "./axiosHelper";
import { API_URL } from "../config/config";
import { jwtDecode } from "jwt-decode";

const getUsers = async () => {
  const token = getDataLocalStorage("token");
  const url = API_URL;
  const result = await axiosGet(url, token);
  if (result !== undefined) {
    return result.data;
  }
};

const getDiningRooms = async () => {
  const token = getDataLocalStorage("token");
  const url = `${API_URL}dining-room/`;
  const result = await axiosGet(url, token);
  if (result !== undefined) {
    return result.data;
  }
};

const getProducts = async () => {
  const token = getDataLocalStorage("token");
  const data = jwtDecode(token);
  const url = `${API_URL}products/${data.dining_room_id}`;
  const result = await axiosGet(url, token);
  if (result !== undefined) {
    return result.data;
  }
};

const getEmployees = async () => {
  const token = getDataLocalStorage("token");
  const data = jwtDecode(token);
  const url = `${API_URL}employees/${data.dining_room_id}`;
  const result = await axiosGet(url, token);
  if (result !== undefined) {
    return result.data;
  }
};

export { getUsers, getDiningRooms, getProducts, getEmployees };
