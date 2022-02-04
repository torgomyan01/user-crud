import axios from "axios";
import { ALL_URL } from "../utils/consts";

// GET ALL COUNTRY
export const getAllCountry = () => {
  return axios.get(ALL_URL.ALL_COUNTRY);
};

// GET TEST SUERS
export const getUsers = () => {
  return axios.get(ALL_URL.USERS);
};
