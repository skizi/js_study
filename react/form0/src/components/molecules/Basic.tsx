import React, { useContext, useMemo } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";
// import useStyles from "../styles";

import { Gender } from "../../domain/entity/gender";
import { PROFILE } from "../../domain/services/profile";

import { ProfileContext } from "../../store/profile/contexts";

const Basic = (): JSX.Element => {
  // const classes = useStyles();
  const classes = {
    title: "",
    textField: "",
    formField: "",
  };

  const { handleBasicProfileChange, validation, basic } = useContext(
    ProfileContext
  );

  //useMemoの影響でProfileのsetBasicが機能していなかった模様
  return useMemo(() => {
    return (
      <>
        <Typography
          variant="h4"
          component="h2"
          className={classes.title}
          color="primary"
        >
          基本情報
        </Typography>
        <TextField
          fullWidth
          className={classes.textField}
          label={PROFILE.BASIC.NAME}
          onChange={(e): void =>
            handleBasicProfileChange({ name: e.target.value })
          }
          required
          error={!!validation.message.basic.name}
          helperText={validation.message.basic.name}
          inputProps={{
            "data-testid": "name",
          }}
        />

        <TextField
          fullWidth
          multiline
          className={classes.textField}
          rows={5}
          label={PROFILE.BASIC.DESCRIPTION}
          onChange={(e): void =>
            handleBasicProfileChange({ description: e.target.value })
          }
          error={!!validation.message.basic.description}
          helperText={validation.message.basic.description}
          inputProps={{
            "data-testid": "description",
          }}
        />

        <FormControl
          className={classes.formField}
          error={!!validation.message.basic.gender}
          required
        >
          <FormLabel>{PROFILE.BASIC.GENDER}</FormLabel>
          <RadioGroup
            onChange={(e): void =>
              handleBasicProfileChange({ gender: e.target.value as Gender })
            }
          >
            <FormControlLabel
              value="male"
              label="男性"
              control={
                <Radio
                  color="primary"
                  inputProps={{
                    // @ts-ignore
                    "data-testid": "male",
                  }}
                />
              }
            />
            <FormControlLabel
              value="female"
              label="女性"
              control={
                <Radio
                  color="primary"
                  inputProps={{
                    // @ts-ignore
                    "data-testid": "female",
                  }}
                />
              }
            />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          className={classes.formField}
          label={PROFILE.BASIC.BIRTHDAY}
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={(e): void =>
            handleBasicProfileChange({ birthday: e.target.value })
          }
          required
          error={!!validation.message.basic.birthday}
          inputProps={{
            // @ts-ignore
            "data-testid": "birthday",
          }}
        />
      </>
    );
  }, [validation.message.basic, basic]);
};

export default React.memo(Basic);
