import React, { Fragment, useContext, useMemo } from "react";
import {
  TextField,
  Typography,
  InputLabel,
  Grid,
  Button,
} from "@material-ui/core";
import useStyles from "../styles";
import { PROFILE } from "../../domain/services/profile";

import { exitEmptyCareers } from "../../domain/services/career";

import { ProfileContext } from "../../store/profile/contexts";

const Career: React.FC = () => {
  const classes = useStyles();

  const {
    handleChangeCareer,
    handleAddCareer,
    handleDeleteCareer,
    validation,
    careers,
  } = useContext(ProfileContext);

  const isAbleToAddCarrer = exitEmptyCareers(careers);

  return useMemo(() => {
    return (
      <>
        <Typography
          variant="h4"
          component="h2"
          className={classes.title}
          color="primary"
        >
          職歴
        </Typography>

        {careers.map((c, i) => (
          <Fragment key={i}>
            <Typography variant="h5" component="h3" className={classes.title}>
              職歴 {i + 1}
            </Typography>
            <TextField
              className={classes.formField}
              fullWidth
              label={PROFILE.CAREERS.COMPANY}
              value={c.company}
              onChange={(e) => {
                handleChangeCareer({ company: e.target.value }, i);
              }}
              error={!!validation.message.careers[i]?.company}
              helperText={validation.message.careers[i]?.company}
              inputProps={{
                "data-testid": "company",
              }}
            />
            <TextField
              className={classes.formField}
              fullWidth
              label={PROFILE.CAREERS.POSITION}
              value={c.position}
              onChange={(e) => {
                handleChangeCareer({ position: e.target.value }, i);
              }}
              error={!!validation.message.careers[i]?.position}
              helperText={validation.message.careers[i]?.position}
              inputProps={{
                "data-testid": "position",
              }}
            />
            <div className={classes.careerSpan}>
              <InputLabel shrink>{PROFILE.CAREERS.SPAN}</InputLabel>
              <Grid
                container
                spacing={1}
                alignContent="space-between"
                alignItems="center"
              >
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    type="month"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={c.startAt}
                    onChange={(e) => {
                      handleChangeCareer({ startAt: e.target.value }, i);
                    }}
                    error={!!validation.message.careers[i]?.startAt}
                    helperText={validation.message.careers[i]?.startAt}
                    inputProps={{
                      "data-testid": "startAt",
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center">〜</Typography>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    type="month"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={c.endAt}
                    onChange={(e) => {
                      handleChangeCareer({ endAt: e.target.value }, i);
                    }}
                    error={!!validation.message.careers[i]?.endAt}
                    helperText={validation.message.careers[i]?.endAt}
                    inputProps={{
                      "data-testid": "endAt",
                    }}
                  />
                </Grid>
              </Grid>
            </div>
            <Button
              className={classes.button}
              onClick={() => {
                handleDeleteCareer(i);
              }}
              fullWidth
              variant="outlined"
              color="secondary"
              data-testid="delete"
            >
              職歴 {i + 1} を削除
            </Button>
          </Fragment>
        ))}

        <Button
          className={classes.button}
          onClick={handleAddCareer}
          fullWidth
          variant="outlined"
          disabled={isAbleToAddCarrer}
          data-testid="add"
        >
          職歴を追加
        </Button>
      </>
    );
  }, [validation.message.careers, careers]);
};

export default React.memo(Career);
