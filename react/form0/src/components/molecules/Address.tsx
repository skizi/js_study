import React, { useContext, useMemo } from "react";
import { TextField, Typography } from "@material-ui/core";

import { PROFILE } from "../../domain/services/profile";
import useStyles from "../styles";

import { ProfileContext } from "../../store/profile/contexts";

const Address: React.FC = () => {
  const {
    prefecture,
    city,
    handleAddressChange,
    handlePostalcodeChange,
    validation,
  } = useContext(ProfileContext);

  const classes = useStyles();

  return useMemo(() => {
    return (
      <>
        <Typography
          variant="h4"
          component="h2"
          className={classes.title}
          color="primary"
        >
          住所
        </Typography>

        <TextField
          fullWidth
          className={classes.formField}
          label={PROFILE.ADDRESS.POSTALCODE}
          onChange={(e): void => handlePostalcodeChange(e.target.value)}
          required
          error={!!validation.message.address.postalcode}
          helperText={validation.message.address.postalcode}
          inputProps={{
            "data-testid": "postalcode",
          }}
        />
        <TextField
          fullWidth
          className={classes.formField}
          label={PROFILE.ADDRESS.PREFECTURE}
          value={prefecture}
          onChange={(e): void =>
            handleAddressChange({ prefecture: e.target.value })
          }
          required
          error={!!validation.message.address.prefecture}
          helperText={validation.message.address.prefecture}
          inputProps={{
            "data-testid": "prefecture",
          }}
        />
        <TextField
          fullWidth
          className={classes.formField}
          label={PROFILE.ADDRESS.CITY}
          value={city}
          onChange={(e): void => handleAddressChange({ city: e.target.value })}
          required
          error={!!validation.message.address.city}
          helperText={validation.message.address.city}
          inputProps={{
            "data-testid": "city",
          }}
        />
        <TextField
          fullWidth
          className={classes.formField}
          label={PROFILE.ADDRESS.RESTADDRESS}
          onBlur={(e): void =>
            handleAddressChange({ restAddress: e.target.value })
          }
          error={!!validation.message.address.restAddress}
          helperText={validation.message.address.restAddress}
          inputProps={{
            "data-testid": "restAddress",
          }}
        />
      </>
    );
  }, [validation.message.address, city, prefecture]);
};

export default React.memo(Address);
