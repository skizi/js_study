import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../domain/entity/rootState";

import { Container, Button } from "@material-ui/core";
import useStyles from "../styles";

import { Profile as ProfileType } from "../../domain/entity/profile";
import profileActions from "../../store/profile/actions";
import { ProfileContext } from "../../store/profile/contexts";

import Basic from "../molecules/Basic";
import { useBasic } from "../../store/profile/useBasic";

import Address from "../molecules/Address";
import { useAddress } from "../../store/profile/useAddress";

import Career from "../molecules/Career";
import { useCareer } from "../../store/profile/useCareer";

import College from "../molecules/College";
import { useCollege } from "../../store/profile/useCollege";

import { calculateValidation, isValid } from "../../domain/services/validation";

import Alert from "../molecules/Alert";
import { Alert as AlertType } from "../../domain/entity/alert";

import { Validation as ValidationType } from "../../domain/entity/validation";





const Profile = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const profile:ProfileType = useSelector((state: RootState) => state.profile);

  //--------------------Validation------------------------
  const [ validation, setValidation ] = useState<ValidationType>({
    isStartValidation: false,
    message: {
      basic:{
        name: "",
        description: "",
        birthday: "",
        gender: "",
      },
      address: {
        postalcode: "",
        prefecture: "",
        city: "",
        restAddress: ""
      },
      college: {
        faculty: ""
      },
      careers: []
    }
  });

  const recalculateValidation = ( _profile:ProfileType ) => {
    
    if (!validation.isStartValidation) return;

    const message = calculateValidation(_profile);
    setValidation({ ...validation, message });

  };

  //--------------------Basic, Address, Careers, College, Custom Hooks------------------------
  const { basic, handleBasicProfileChange } = useBasic( profile, recalculateValidation );
  const { address, handleAddressChange, handlePostalcodeChange } = useAddress( profile, recalculateValidation );
  const { careers, handleChangeCareer, handleAddCareer, handleDeleteCareer } = useCareer( profile, recalculateValidation );
  const { college, handleSearchCollege, handleChangeCollege, handleResetCollege } = useCollege( profile, recalculateValidation );
  useMemo(()=>{
    dispatch( profileActions.setProfile({ basic, address, careers, college }) );
  }, [basic, address, careers, college]);


  //--------------------保存------------------------
  const handleSave = () => { //こいつをカスタムフック(useSaveとか)にしてテストした方が良さげ？


    const message = calculateValidation(profile);

    if (isValid(message)) {
      setAlert({
        severity: "success",
        message: "保存に成功しました！",
        open:true
      });
      dispatch( profileActions.setProfile(profile) );
      return;
    }

    setValidation({ isStartValidation:true, message });

    setAlert({
      severity: "error",
      message: "入力に誤りがあります。",
      open:true
    });

  };


  //--------------------Alert------------------------
  const [alert, setAlert] = useState<AlertType>({
    severity: "error",
    message: "",
    open: false
  });

  const handleAlertClose = () => {
    setAlert({ ...alert, open:false });
  };


  return (
    <Container maxWidth="sm">
      <ProfileContext.Provider value={{
        handleBasicProfileChange,
        basic,

        prefecture:address.prefecture,
        city:address.city,
        handleAddressChange,
        handlePostalcodeChange,

        handleChangeCareer,
        handleAddCareer,
        handleDeleteCareer,
        careers,

        handleChangeCollege,
        handleSearchCollege,
        handleResetCollege,
        college,

        validation,

        handleAlertClose,
        alert
      }}>

        <Container maxWidth="sm">
          <Basic />
          <Address />
          <Career />
          <College />
        </Container>
        <Alert />

      </ProfileContext.Provider>

      <Button
      fullWidth
      className={classes.button}
      onClick={handleSave}
      variant="outlined"
      color="primary"
      data-testid="saveBtn"
      >
      保存
      </Button>
    </Container>
  );
};

export default React.memo(Profile);