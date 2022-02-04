import React, { useEffect } from "react";
import { DEF_USER, typesAndNames } from "../utils/consts";
import {
  Checkbox,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MainTemplate from "../componenets/main-template";
import "bootstrap/dist/css/bootstrap.min.css";
import { icon } from "../features/icons";
import { useState } from "react";
import { keyGenerator } from "../utils/helper";
import AddUserModal from "../features/add-user-modal";
import moment from "moment";
import { getUsers } from "../all-apis/all-api";
import { AxiosResponse } from "axios";
import TableItems from "../componenets/table-items";

interface IThisProps {
  users: IUserInfo[];
}

const tableCount = 5;

function Home({ users }: IThisProps) {
  // ALL USERS ARRAY
  const [emptyArray, setEmptyArray] = useState<IUserInfo[]>([...users]);
  const [allUsers, setAllUsers] = useState<IUserInfo[]>([...users]);
  const [modalAddUser, setModalAddUser] = useState<boolean>(false);

  // SEARCHING TYPE
  const [searchType, setSearchType] = useState<string>("");
  const [searchTypeError, setSearchTypeError] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  // FOR CHECKING USERS ARRAY AND CHECKED ALL STATUS
  const [checked, setChecked] = useState<IChecked[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

  // CALCULATION USER PAGINATION
  const pageNumber = emptyArray.length % tableCount;
  const pageCalc = Number((emptyArray.length / tableCount).toFixed());
  const pages = pageNumber > 0 ? pageCalc + 1 : pageCalc;
  const [nowPages, setNowPages] = useState<number>(1);

  useEffect(() => goCalcPagination(), [nowPages, emptyArray]);

  useEffect(() => {
    checked.length === allUsers.length
      ? setCheckedAll(true)
      : setCheckedAll(false);
  }, [checked]);

  /**
   * Open modal from add user
   */
  function openModalAddUser() {
    setModalAddUser(true);
  }

  /**
   * This function to add new user from modal, this function working callBack
   * @param res
   */
  function getNewUser(res: IUserInfo) {
    const _allUsers = [...emptyArray];
    _allUsers.unshift(res);
    setEmptyArray(_allUsers);
    setTimeout(() => setModalAddUser(false), 100);
  }

  useEffect(() => {
    startSearch(searchValue);
  }, [searchType]);

  /**
   * For select change event
   * @param event
   */
  const handleChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as string);
  };

  /**
   * Change event from search input
   * @param e
   */
  function goSearch(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const value = e.target.value;
    setSearchValue(value);
    startSearch(value);
  }

  /**
   * This function called two places for goSearch() and useEffect call
   * @param value
   */
  function startSearch(value: string) {
    if (!value) {
      setSearchTypeError(false);
      goCalcPagination();
      return;
    }
    if (!searchType) {
      setSearchTypeError(true);
      return;
    }
    setSearchTypeError(false);
    const newRes = emptyArray.filter((user: any) =>
      user[searchType].toLowerCase().includes(value.toLowerCase())
    );
    newRes && setAllUsers(newRes);
  }

  /**
   * This CallBack function added and removed checked status for user
   * @param res
   */
  function changeChecked(res: IChecked) {
    const useFilter = checked.some((ch: IChecked) => ch.id === res.id);
    if (useFilter) {
      const oldArray = [...checked];
      const _oldArrayFind = oldArray.find((_ch: IChecked) => _ch.id === res.id);
      if (_oldArrayFind) {
        const oldArrayIndexOf = oldArray.indexOf(_oldArrayFind);
        oldArray.splice(oldArrayIndexOf, 1);
        setChecked(oldArray);
      }
    } else {
      setChecked((oldArr: IChecked[]) => [...oldArr, res]);
    }
  }

  /**
   * This Function worked to add checked all users
   * @constructor
   */
  function ChangeCheckedAll() {
    const res = !checkedAll;
    if (res) {
      const All = allUsers.map((user: IUserInfo) => {
        return {
          id: user.id,
          status: true,
        };
      });
      setChecked(All);
    } else {
      setChecked([]);
    }
    setCheckedAll(res);
  }

  /**
   * For delete all selected users
   */
  function deleteSelectedUser() {
    const _checked = [...checked];
    _checked.map((ch: IChecked) => {
      const _emptyArray = [...emptyArray];
      const indexEmpty = _emptyArray.findIndex(
        (user: IUserInfo) => user.id === ch.id
      );
      _emptyArray.splice(indexEmpty, 1);
      setEmptyArray(_emptyArray);
    });
    setChecked([]);
    setCheckedAll(false);
  }

  /**
   * Calculation for page count, this function called two places, useEffect and searching user, when this empty
   */
  function goCalcPagination() {
    const useArrayIndex = nowPages * tableCount;
    const cropArray = [...emptyArray].splice(
      useArrayIndex - tableCount,
      tableCount
    );
    setAllUsers(cropArray);
  }

  return (
    <MainTemplate title="Hom Page">
      <Container maxWidth="lg" className="def-container">
        <h1>Table Users</h1>
        <div className="filter-header">
          <div className="falters">
            <div className="filters-item" onClick={deleteSelectedUser}>
              {icon.delete}
              Delete
            </div>
            <div className="filters-item" onClick={openModalAddUser}>
              {icon.plus}
              Add User
            </div>
          </div>
          <div className="search-block">
            <FormControl
              className="me-2 search-block-mine"
              variant="standard"
              style={{ width: 150 }}
              error={searchTypeError}
            >
              <InputLabel id="demo-simple-select-label">Search Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchType}
                label="Search Type"
                onChange={handleChange}
              >
                <MenuItem value="">None</MenuItem>
                {typesAndNames.map(
                  (type: { name: string; objName: string }) => (
                    <MenuItem key={keyGenerator(20)} value={type.objName}>
                      {type.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <FormControl variant="standard" className="search-block-mine">
              <InputLabel htmlFor="input-with-icon-adornment">
                Search User
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                onChange={goSearch}
                startAdornment={
                  <InputAdornment position="start">
                    {icon.search}
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </div>
        <TableContainer component={Paper} className="mt-5 mb-5">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    onClick={ChangeCheckedAll}
                    checked={checkedAll}
                  />
                </TableCell>
                {typesAndNames.map((type) => (
                  <TableCell key={keyGenerator(10)} align="left">
                    {type.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody style={{ height: 200 }}>
              {allUsers.map((_user: IUserInfo) => (
                <TableItems
                  key={keyGenerator(20)}
                  _user={_user}
                  onChecked={changeChecked}
                  AllChecked={checked}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={pages}
          variant="outlined"
          onChange={(e: any, page: number) => setNowPages(page)}
        />
      </Container>
      <AddUserModal
        show={modalAddUser}
        closeModal={() => setModalAddUser(false)}
        useNewUser={getNewUser}
      />
    </MainTemplate>
  );
}

Home.getInitialProps = async () => {
  const oldUsers = [DEF_USER];

  /**
   * Print random number For crate random user number
   */
  function randomNumber() {
    return Math.floor(Math.random() * 8);
  }

  /**
   * Get Test users 10
   */
  await getUsers().then((res: AxiosResponse) => {
    res.data.map((user: any) => {
      const number = `077 ${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}`;
      oldUsers.push({
        id: keyGenerator(10),
        firstName: user.name,
        lastName: user.username,
        year: moment().subtract(randomNumber(), "year").format(),
        email: user.email,
        phone: number,
        country: user.address.city,
        city: user.address.street,
      });
    });
  });
  return {
    users: oldUsers,
  };
};

export default Home;
