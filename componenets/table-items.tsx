import { Checkbox, TableCell, TableRow } from "@mui/material";
import { keyGenerator } from "../utils/helper";
import moment from "moment";
import React, { useState } from "react";

interface IThisProps {
  _user: IUserInfo;
  onChecked: any;
  AllChecked: IChecked[];
}

function TableItems({ _user, onChecked, AllChecked }: IThisProps) {
  const viewChecked = AllChecked.some((ch: IChecked) => ch.id === _user.id);
  const [checked, setChecked] = useState<boolean>(viewChecked);

  /**
   * Start CallBack from check user
   */
  function changeChecked() {
    const status = !checked;
    setChecked(status);
    onChecked({
      id: _user.id,
      status: status,
    });
  }

  return (
    <TableRow
      key={keyGenerator(20)}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left" padding="checkbox">
        <Checkbox
          color="primary"
          onClick={changeChecked}
          checked={checked}
          inputProps={{
            "aria-labelledby": `user__${_user.id}`,
          }}
        />
      </TableCell>
      <TableCell align="left" style={{ minWidth: 200 }}>
        {_user.firstName}
      </TableCell>
      <TableCell align="left">{_user.lastName}</TableCell>
      <TableCell align="left" style={{ minWidth: 100 }}>
        {moment(_user.year).format("MMM Do YY")}
      </TableCell>
      <TableCell align="left">{_user.email}</TableCell>
      <TableCell align="left" style={{ minWidth: 150 }}>
        {_user.phone}
      </TableCell>
      <TableCell align="left">{_user.country}</TableCell>
      <TableCell align="left" style={{ minWidth: 150 }}>
        {_user.city}
      </TableCell>
    </TableRow>
  );
}

export default TableItems;
