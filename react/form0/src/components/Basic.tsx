import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Container, FormHelperText} from "@material-ui/core";
import useStyles from "./styles";
import { RootState } from "../domain/entity/rootState";

import { Profile } from "../domain/entity/profile";
import { Gender } from "../domain/entity/gender";
import profileActions from "../store/profile/actions";
import { PROFILE } from "../domain/services/profile";

import Address from "./Address";
import Career from "./Career";

import College from "./College";

import { calculateValidation } from "../domain/services/validation";
import validationActions from "../store/validation/actions";

import { ProfileContext } from "../store/profile/contexts";


type Props = {
	gender:string;
	changeGender:( gender:string ) => void;
	birthDay:string;
	changeBirthDay:( birthDay:string ) => void;
	name:string;
	changeName:( name:string ) => void;
	description:string;
	changeDescription:( name:string ) => void;
	// postalcode:string;
	// changePostalcode:( postalcode:string ) => void;
	// prefecture:string;
	// changePrefecture:( prefecture:string ) => void;
	// city:string;
	// changeCity:( city:string ) => void;
	// restAddress:string;
	// changeRestAddress:( restAddress:string ) => void;
}

const Basic = () => {

	const classes = useStyles();

	const dispatch = useDispatch();
	const profile = useSelector( ( state:RootState) => state.profile );
	const validation = useSelector((state: RootState) => state.validation);
 	
	const { changeProfile } = useContext(ProfileContext);


	const handleChange = ( member:Partial<Profile> ) => {
		dispatch( profileActions.setProfile( member ) );
	    recalculateValidation(member);
	}

	const recalculateValidation = (member: Partial<Profile>) => {
		// バリデーションのエラーを表示し始めてたらメッセージを計算して更新
		if (!validation.isStartValidation) return;

		const newProfile = {
		...profile,
		...member
		};
		const message = calculateValidation(newProfile);
		dispatch(validationActions.setValidation(message));
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
			<TextField fullWidth className={classes.textField} label={ PROFILE.NAME } onChange={ e => changeProfile( { name:e.target.value } ) }
	        required
	        error={!!validation.message.name}
	        helperText={validation.message.name} />
			
			<TextField fullWidth multiline className={classes.textField} rows={5} label={ PROFILE.DESCRIPTION } onChange={ e => changeProfile( { description:e.target.value } ) }
		    error={!!validation.message.description}
		    helperText={validation.message.description} />
			
			<FormControl className={classes.formField}
	        error={!!validation.message.gender}
	        required>
				<FormLabel>{PROFILE.GENDER}</FormLabel>
				<RadioGroup onChange={e=>changeProfile( { gender:e.target.value as Gender } )}>
					<FormControlLabel value="male" label="男性" control={<Radio color="primary" />} />
					<FormControlLabel value="female" label="女性" control={<Radio color="primary" />} />
				</RadioGroup>
			</FormControl>

			<TextField fullWidth className={classes.formField} label={PROFILE.BIRTHDAY} type="date" InputLabelProps={{shrink:true}} onChange={ e => changeProfile( { birthday:e.target.value } ) }
	        required
	        error={!!validation.message.birthday} />


			<Typography
			variant="h4"
			component="h2"
			className={classes.title}
			color="primary"
			>
				住所
			</Typography>

			<Address />


			<Typography
			variant="h4"
			component="h2"
			className={classes.title}
			color="primary"
			>
				職歴
			</Typography>
			<Career />


			<Typography
			variant="h4"
			component="h2"
			className={classes.title}
			color="primary"
			>
				学歴
			</Typography>
			<College />
		
		</Container>
	);

}


export default Basic;