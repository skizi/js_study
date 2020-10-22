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
// import { Gender } from "../domain/entity/gender";

import { Career } from "../domain/entity/career";
import { exitEmptyCareers } from "../domain/services/career";

import { College } from "../domain/entity/college";
import { searchColleges } from "../store/profile/effects";


const Profile = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const validation = useSelector((state: RootState) => state.validation);



  //---------------------Basic---------------------------
  const [ localProfile, setLocalProfile ] = useState( {
    name:"",
    description:"",
    birthday:"",
    gender:""
  } );
  const handleBasicProfileChange = (member:Partial<ProfileOnContext>) => {
    // const key:string = Object.keys(member)[0];
    // const _member:any = member as any;

    // setLocalProfile( { ...localProfile, [key]:_member[key] } );
    setLocalProfile( { ...localProfile, ...member } );
    recalculateBasicValidation(member);
  }

  const recalculateBasicValidation = (member: Partial<IProfile>) => {
    // バリデーションのエラーを表示し始めてたらメッセージを計算して更新
    if (!validation.isStartValidation) return;

    const newProfile = {
    ...profile,
    ...member
    };
    const message = calculateValidation(newProfile);
    dispatch(validationActions.setValidation(message));
  };



  //--------------------Address-------------------------
  const [ restAddress, setRestAddress ] = useState( "" );
  const handleAddressChange = (member:Partial<IAddress>) => {

    if( member.restAddress ){
      setRestAddress( member.restAddress );
      return;
    }

    dispatch(profileActions.setAddress( member ));
    recalculateAddressValidation({ address: { ...profile.address, ...member } });
  }


  const handlePostalcodeChange = (code: string) => {
    if (!isPostalcode( code )) return; // エラーになるのでコードには転写しないでください。

      dispatch(searchAddressFromPostalcode(code));

      recalculateAddressValidation({
        address: { ...profile.address, postalcode: code }
      });
  };


  const recalculateAddressValidation = (member: Partial<IProfile>) => {
      if (!validation.isStartValidation) return;

      const newProfile = {
        ...profile,
        ...member
      };
      const message = calculateValidation(newProfile);
      dispatch(validationActions.setValidation(message));
  };



  //--------------------Career------------------------
  const careers = useSelector( ( state:RootState) => state.profile.careers );
  const handleChangeCareer = (member: Partial<Career>, i: number) => {
    dispatch(profileActions.setCareer({ career: member, index: i }));
    recalculateCareerValidation(member, i);
  };

  const handleAddCareer = () => {
    if( exitEmptyCareers( careers ) ) return;

    dispatch(profileActions.addCareer({}));
  };

  const handleDeleteCareer = ( i:number ) => {
    dispatch(profileActions.deleteCareer(i));
  };


  const recalculateCareerValidation = (member: Partial<Career>, i: number) => {
    if (!validation.isStartValidation) return;

    const newProfile = {
      ...profile,
      career: profile.careers.map((c, _i) =>
        _i === i ? { ...c, ...member } : c
      )
    };
    const message = calculateValidation(newProfile);
    dispatch(validationActions.setValidation(message));
  };


  //-------------------College----------------------
  const handleChangeCollege = ( member:Partial<College> ) => {
    dispatch( profileActions.setCollege( member ) );
      recalculateCollegeValidation(member);
  }

  const handleSearchCollege = ( searchWord:string ) => {

    dispatch( searchColleges( searchWord ) );

  }

  const handleResetCollege = () => {

    handleChangeCollege( { name:"", faculty:"", department:"" } );
    
    dispatch(profileActions.searchCollege.done({ result: [], params: {} }));

  }


  const recalculateCollegeValidation = (member: Partial<College>) => {
    if (!validation.isStartValidation) return;
    const newProfile = {
    ...profile,
    college: { ...profile.college, ...member }
    };
    const message = calculateValidation(newProfile);
    dispatch(validationActions.setValidation(message));
  };



  //--------------------保存------------------------
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

      <ProfileContext.Provider value={{
        handleBasicProfileChange,

        prefecture:profile.address.prefecture,
        city:profile.address.city,
        restAddress:restAddress,
        handleAddressChange,
        handlePostalcodeChange,

        handleChangeCareer,
        handleAddCareer,
        handleDeleteCareer,

        handleChangeCollege,
        handleSearchCollege,
        handleResetCollege,

        validation
      }}>
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