import { keyGenerator } from "./helper";
import moment from "moment";

// ALL API URLS
export const ALL_URL = {
  ALL_COUNTRY: "https://restcountries.com/v3.1/all",
  USERS: "https://jsonplaceholder.typicode.com/users",
};

// TEST CUSTOM USER
export const DEF_USER = {
  id: keyGenerator(10),
  firstName: "Andranik",
  lastName: "Torgomyan",
  year: moment().format(),
  email: "and.torgomyan01@gmai.com",
  phone: "077769668",
  country: "Armenia",
  city: "Yerevan",
};

// ALL TYPES AN NAMES FROM TABLE
export const typesAndNames = [
  {
    name: "First Name",
    objName: "firstName",
  },
  {
    name: "Last Name",
    objName: "lastName",
  },
  {
    name: "Year",
    objName: "year",
  },
  {
    name: "Email",
    objName: "email",
  },
  {
    name: "Phone Number",
    objName: "phone",
  },
  {
    name: "Country",
    objName: "country",
  },
  {
    name: "City",
    objName: "city",
  },
];
