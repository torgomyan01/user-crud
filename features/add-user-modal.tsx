import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import moment from "moment";
import { getAllCountry } from "../all-apis/all-api";
import UserTelInputMask from "./user-tel-input-mask";
import { keyGenerator } from "../utils/helper";

interface IThisProps {
  show: boolean;
  closeModal: () => void;
  useNewUser: any;
}

function AddUserModal({ show, closeModal, useNewUser }: IThisProps) {
  const [country, setCountry] = useState<any[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [year, setYear] = useState<string>(moment().format());
  const [countryName, setCountryName] = useState<string>("");
  const [city, setCity] = useState<string>("");

  // GET ALL COUNTRY
  useEffect(() => {
    getAllCountry().then((res: any) => {
      const _country: any[] = [];
      res.data?.map((country: any) => {
        _country.push({
          name: country.name.common,
          flagUrl: country.flags.svg,
        });
      });
      setCountry(_country);
    });
  }, []);

  /**
   * Get change value Year
   * @param newValue
   */
  const handleChangeDate = (newValue: any) => {
    setYear(newValue);
  };

  /**
   * Get value input mask to phone
   * @param res
   */
  function changeInputMask(res: { numberformat: string; textmask: string }) {
    setPhone(res.numberformat);
  }

  /**
   * Get value Country
   * @param e
   * @param value
   */
  function changeAutoComplete(e: any, value: any) {
    setCountryName(value.name);
  }

  /**
   * Function Worked to CallBack form add user
   */
  const startSave = useCallback(() => {
    const _newUser = {
      id: keyGenerator(10),
      firstName,
      lastName,
      year,
      email,
      phone,
      country: countryName,
      city,
    };
    useNewUser(_newUser);
  }, [firstName, lastName, email, phone, year, countryName, city]);

  return (
    <Modal show={show} onHide={closeModal} className="modal-bg-blur-effect">
      <Modal.Header closeButton>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between">
          <TextField
            label="First Name"
            onChange={(
              e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setFirstName(e.target.value)}
            variant="standard"
            className="w-50 me-2"
          />
          <TextField
            label="Last Name"
            onChange={(
              e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setLastName(e.target.value)}
            variant="standard"
            className="w-50"
          />
        </div>
        <div className="d-flex justify-content-between mt-2">
          <TextField
            label="Email"
            variant="standard"
            onChange={(
              e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setEmail(e.target.value)}
            className="w-100"
          />
        </div>
        <div className="d-flex justify-content-between mt-2">
          <UserTelInputMask onChange={changeInputMask} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} className="w-50 me-2">
              <DesktopDatePicker
                label="Year"
                inputFormat="MM.dd.yyyy"
                value={year}
                onChange={handleChangeDate}
                renderInput={(params: any) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <Autocomplete
            className="w-50 me-2"
            onChange={changeAutoComplete}
            sx={{ width: 300 }}
            options={country}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={option.flagUrl}
                  srcSet={option.flagUrl}
                  alt=""
                />
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <TextField
            label="City"
            onChange={(
              e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCity(e.target.value)}
            variant="standard"
            className="w-50"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outlined" onClick={startSave}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUserModal;
