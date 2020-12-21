import React, { useState, useContext, useMemo } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";

import { PROFILE } from "../../domain/services/profile";
import useStyles from "../styles";

import { ProfileContext } from "../../store/profile/contexts";

const College: React.FC = () => {
  const [searchWord, setSearchWord] = useState("");

  const handleChange = (name: string): void => {
    setSearchWord(name);
  };

  const {
    handleChangeCollege,
    handleSearchCollege,
    handleResetCollege,
    validation,
    college,
  } = useContext(ProfileContext);

  const currentCollege = useMemo(() => {
    return college.result.filter((c) => c.name === college.name)[0];
  }, [college.result, college.name]);

  const currentFaculty = currentCollege?.faculty.filter(
    (f) => f.name === college.faculty
  )[0];

  const classes = useStyles();

  // return useMemo(() => {
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        学歴
      </Typography>

      {!college.name && (
        <>
          <TextField
            className={classes.formField}
            fullWidth
            label="大学名を検索"
            onChange={(e): void => handleChange(e.target.value)}
            inputProps={{
              "data-testid": "search",
            }}
          />
          <Button
            className={classes.button}
            onClick={(): void => handleSearchCollege(searchWord)}
            fullWidth
            variant="outlined"
            color="primary"
            disabled={!searchWord}
            data-testid="searchBtn"
          >
            検索
          </Button>

          <Grid spacing={1} container>
            {college.result.map((c) => (
              <Grid key={c.name} item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={(): void => handleChangeCollege({ name: c.name })}
                  data-testid="collegeNameBtn"
                >
                  {c.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {college.name && (
        <>
          <TextField
            className={classes.formField}
            label={PROFILE.COLLEGE.NAME}
            fullWidth
            value={college.name}
            disabled
          />
          <FormControl
            fullWidth
            className={classes.formField}
            error={!!validation.message.college.faculty}
          >
            <InputLabel>{PROFILE.COLLEGE.FACULTY}</InputLabel>
            <Select
              value={college.faculty}
              onChange={(e): void =>
                handleChangeCollege({
                  faculty: e.target.value as string,
                  department: "",
                })
              }
              data-testid="faculty"
            >
              {currentCollege.faculty.map((f) => (
                <MenuItem key={f.name} value={f.name}>
                  {f.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {currentFaculty?.department.length > 0 && (
            <FormControl fullWidth className={classes.formField}>
              <InputLabel>{PROFILE.COLLEGE.DEPARTMENT}</InputLabel>
              <Select
                value={college.department}
                onChange={(e): void =>
                  handleChangeCollege({ department: e.target.value as string })
                }
                data-testid="department"
              >
                {currentFaculty.department.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <div>{college.name}が選択されています。</div>
          <Button
            fullWidth
            className={classes.button}
            onClick={(): void => {
              handleResetCollege();
              setSearchWord("");
            }}
            variant="outlined"
            color="secondary"
            data-testid="resetBtn"
          >
            学歴の入力情報をリセット
          </Button>
        </>
      )}
    </>
  );
  // }, [validation.message.college, college, searchWord]);
};

export default React.memo(College);
