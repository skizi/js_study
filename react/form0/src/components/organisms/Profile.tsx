import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../domain/entity/rootState";

import useStyles from "../styles";
import { Container, Typography, Button } from "@material-ui/core";

import { Profile as ProfileType } from "../../domain/entity/profile";
import { Basic as BasicType } from "../../domain/entity/basic";

import Basic from "../molecules/Basic";

import Address from "../molecules/Address";
import { ProfileContext, ProfileOnContext } from "../../store/profile/contexts";
import { useSearchAddress } from "../../store/profile/effects";
import profileActions from "../../store/profile/actions";
import { Address as AddressType } from "../../domain/entity/address";
import { isPostalcode } from "../../domain/services/address";

import Career from "../molecules/Career";
import { Career as CareerType } from "../../domain/entity/career";
import { exitEmptyCareers } from "../../domain/services/career";

import College from "../molecules/College";
import { College as CollegeType } from "../../domain/entity/college";
import { useSearchColleges } from "../../store/profile/effects";

import { calculateValidation, isValid } from "../../domain/services/validation";
import validationActions from "../../store/validation/actions";
import alertActions from "../../store/alert/actions";

import Alert from "../molecules/Alert";
import { Alert as AlertType } from "../../domain/entity/alert";

import { Validation as ValidationType } from "../../domain/entity/validation";





const Profile = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  //addressとか全てこのprofileにsetProfileすればよくね？
  const [profile, setProfile] = useState<ProfileType>({
    basic:{
      name:"",
      description:"",
      birthday:"",
      gender:"",
    },

    address:{
      postalcode:"",
      prefecture:"",
      city:"",
      restAddress:""
    },

    careers:[],

    college:{
      name: "",
      faculty: "",
      department: "",
      result:[]
    }
  });
  const addressValidation = useSelector((state: RootState) => state.validation.message.address);



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


  //---------------------Basic---------------------------
  const [ basic, setBasic ] = useState<BasicType>( {
    name:"",
    description:"",
    birthday:"",
    gender:""
  } );
  const handleBasicProfileChange = (member:Partial<BasicType>) => {
    // const key:string = Object.keys(member)[0];
    // const _member:any = member as any;

    // setBasic( { ...basic, [key]:_member[key] } );
    setBasic( { ...basic, ...member } );
    recalculateBasicValidation(member);
  }


  const recalculateBasicValidation = useCallback(( member: Partial<BasicType> ) => {
    // バリデーションのエラーを表示し始めてたらメッセージを計算して更新
    if (!validation.isStartValidation) return;

    const newProfile = {
      ...profile,
      basic:{ ...basic, ...member }
    };
    const message = calculateValidation(newProfile);
    setValidation({ ...validation, message });
  }, [validation.isStartValidation, profile.basic ]);



  //--------------------Address-------------------------
  const [address, setAddress] = useState<AddressType>({
    postalcode:"",
    prefecture:"",
    city:"",
    restAddress:""
  });
  const handleAddressChange = (member:Partial<AddressType>) => {
    setAddress( { ...address, ...member } );
    recalculateAddressValidation({ address: { ...address, ...member } });
  }

  const { searchAddress } = useSearchAddress(address, setAddress);
  const handlePostalcodeChange = (code: string) => {
    if (!isPostalcode( code )) return; // エラーになるのでコードには転写しないでください。

    searchAddress( code );

    recalculateAddressValidation({
      address: { ...address, postalcode: code }
    });
  };


  const recalculateAddressValidation = (member: Partial<ProfileType>) => {
      if (!validation.isStartValidation) return;

      const newProfile = {
        ...profile,
        ...member
      };
      const message = calculateValidation(newProfile);
      setValidation({ ...validation, message });
  };



  //--------------------Career------------------------
  const [careers, setCareer] = useState<CareerType[]>([]);
  const initCareer: CareerType = {
    company: "",
    position: "",
    startAt: "",
    endAt: ""
  };
  const handleChangeCareer = (member: Partial<CareerType>, index: number) => {
    // dispatch(profileActions.setCareer({ career: member, index: i }));

    const _careers = careers.map(( item, i )=>{
      return i == index ? { ...item, ...member } : item;
    });
    setCareer(_careers);
    recalculateCareerValidation(member, index);
  };

  const handleAddCareer = () => {
    if( exitEmptyCareers( careers ) ) return;
    setCareer([ ...careers, initCareer ]);
  };

  const handleDeleteCareer = ( index:number ) => {
    const _careers = careers.filter(( item, i )=>{
      return i != index;
    });
    setCareer(_careers);
  };


  const recalculateCareerValidation = (member: Partial<CareerType>, i: number) => {
    if (!validation.isStartValidation) return;

    const newProfile = {
      ...profile,
      career: careers.map((c, _i) =>
        _i === i ? { ...c, ...member } : c
      )
    };
    const message = calculateValidation(newProfile);
    setValidation({ ...validation, message });
  };


  //-------------------College----------------------
  const [college, setCollege] = useState<CollegeType>({
    name: "",
    faculty: "",
    department: "",
    result: []
  });
  const handleChangeCollege = ( member:Partial<CollegeType> ) => {
    setCollege({ ...college, ...member });
    recalculateCollegeValidation(member);
  }

  const { searchColleges } = useSearchColleges( college, setCollege );
  const handleSearchCollege = ( searchWord:string ) => {

    searchColleges( searchWord );

  }

  const handleResetCollege = () => {

    handleChangeCollege( { name:"", faculty:"", department:"" } );

  }


  const recalculateCollegeValidation = (member: Partial<CollegeType>) => {
    if (!validation.isStartValidation) return;
    const newProfile = {
    ...profile,
    college: { ...profile.college, ...member }
    };
    const message = calculateValidation(newProfile);
    setValidation({ ...validation, message });
  };



  //--------------------保存------------------------
  const handleSave = () => {

    const message = calculateValidation(profile);

    if (isValid(message)) {
      setAlert({
        severity: "success",
        message: "保存に成功しました！",
        open:true
      });
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
      >
      保存
      </Button>
    </Container>
  );
};

export default React.memo(Profile);