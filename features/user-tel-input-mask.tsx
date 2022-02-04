import { FormControl, InputLabel } from "@mui/material";
import Input from "@mui/material/Input";
import React from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: any;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref: any) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(000) 00-00-00"
        definitions={{
          "#": /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

interface State {
  textmask: string;
  numberformat: string;
}

interface IThisProps {
  onChange: any;
}

function UserTelInputMask({ onChange }: IThisProps) {
  const [values, setValues] = React.useState<State>({
    textmask: "(000) 00-00-00",
    numberformat: "1320",
  });

  const ChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const res = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setValues(res);
    onChange(res);
  };
  return (
    <FormControl variant="standard" className="w-50 me-2">
      <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
      <Input
        value={values.textmask}
        onChange={ChangePhoneNumber}
        name="textmask"
        inputComponent={TextMaskCustom as any}
      />
    </FormControl>
  );
}

export default UserTelInputMask;
