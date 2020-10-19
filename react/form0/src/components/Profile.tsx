import React, { useState } from "react";
import { Container, Typography, Button } from "@material-ui/core";

import Basic from "./Basic";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { calculateValidation, isValid } from "../domain/services/validation";
import validationActions from "../store/validation/actions";
import alertActions from "../store/alert/actions";




const Profile = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const [ gender, setGender ] = useState( "" );
  const changeGender = ( gender:string ) => {
    setGender( gender );
  }


  const [ birthDay, setBirthDay ] = useState( "" );
  const changeBirthDay = ( birthDay:string ) => {
    setBirthDay( birthDay );
  }


  const [ name, setName ] = useState( "" );
  const changeName = ( name:string ) => {
    setName( name );
  }


  const [ description, setDescription ] = useState( "" );
  const changeDescription = ( description:string ) => {
    setDescription( description );
  }


  const [ postalcode, setPostalcode ] = useState( "" );
  const changePostalcode = ( postalcode:string ) => {
    setPostalcode( postalcode );
  }


  const [ prefecture, setPrefecture ] = useState( "" );
  const changePrefecture = ( prefecture:string ) => {
    setPrefecture( prefecture );
  }


  const [ city, setCity ] = useState( "" );
  const changeCity = ( city:string ) => {
    setCity( city );
  }


  const [ restAddress, setRestAddress ] = useState( "" );
  const changeRestAddress = ( restAddress:string ) => {
    setRestAddress( restAddress );
  }


  const handleSave = () => {
    const message = calculateValidation(profile);

    if (isValid(message)) {
      dispatch(
        alertActions.openAlert({
          severity: "success",
          message: "保存に成功しました！"
        })
      );

      return;
    }

    dispatch(validationActions.setValidation(message));
    dispatch(validationActions.setIsStartvalidation(true));

    dispatch(
      alertActions.openAlert({
        severity: "error",
        message: "入力に誤りがあります。"
      })
    );
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        基本情報
      </Typography>
      <Basic
        changeGender={changeGender} gender={gender}
        birthDay={birthDay} changeBirthDay={changeBirthDay}
        name={name} changeName={changeName}
        description={description} changeDescription={changeDescription}
        postalcode={postalcode} changePostalcode={changePostalcode}
        prefecture={prefecture} changePrefecture={changePrefecture}
        city={city} changeCity={changeCity}
        restAddress={restAddress} changeRestAddress={changeRestAddress}
      />

       <Button
      fullWidth
      className={classes.button}
      onClick={handleSave}
      variant="outlined"
      color="primary"
      >
      保存
      </Button>
    </Container>
  );
};

export default Profile;