import React, { useState } from "react";
import { Container, Typography, Button } from "@material-ui/core";

import Basic from "./Basic";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { calculateValidation, isValid } from "../domain/services/validation";
import validationActions from "../store/validation/actions";
import alertActions from "../store/alert/actions";

//address
import { ProfileContext, ProfileOnContext } from "../store/profile/contexts";
import { searchAddressFromPostalcode } from "../store/profile/effects";
import profileActions from "../store/profile/actions";
import { Address as IAddress } from "../domain/entity/address";
import { isPostalcode } from "../domain/services/address";
import { Profile as IProfile } from "../domain/entity/profile";



const Profile = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const validation = useSelector((state: RootState) => state.validation);

  const changeProfile = (member:Partial<ProfileOnContext>) => {
    const key:string = Object.keys(member)[0];
    console.log( member );
  }

  const [ restAddress, setRestAddress ] = useState( "" );
  const handleAddressChange = (member:Partial<IAddress>) => {

    if( member.restAddress ){
      setRestAddress( member.restAddress );
      return;
    }

    dispatch(profileActions.setAddress( member ));
    recalculateValidation({ address: { ...profile.address, ...member } });
  }


  const handlePostalcodeChange = (code: string) => {
    if (!isPostalcode( code )) return; // エラーになるのでコードには転写しないでください。

      dispatch(searchAddressFromPostalcode(code));

      recalculateValidation({
        address: { ...profile.address, postalcode: code }
      });
  };


  const recalculateValidation = (member: Partial<IProfile>) => {
      if (!validation.isStartValidation) return;

      const newProfile = {
        ...profile,
        ...member
      };
      const message = calculateValidation(newProfile);
      dispatch(validationActions.setValidation(message));
  };


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

      <ProfileContext.Provider value={{ prefecture:profile.address.prefecture, city:profile.address.city, restAddress:restAddress, handleAddressChange, handlePostalcodeChange, changeProfile }}>
        <Basic />
      </ProfileContext.Provider>

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