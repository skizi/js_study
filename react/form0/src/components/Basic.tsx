import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Container} from "@material-ui/core";
import useStyles from "./styles";
import { RootState } from "../domain/entity/rootState";

import { Profile } from "../domain/entity/profile";
import { Gender } from "../domain/entity/gender";
import profileActions from "../store/profile/actions";
import { PROFILE } from "../domain/services/profile";

import Address from "./Address";
import Career from "./Career";


const Basic = () => {

	const classes = useStyles();

	const dispatch = useDispatch();
	const profile = useSelector( ( state:RootState) => state.profile );


	const handleChange = ( member:Partial<Profile> ) => {
		dispatch( profileActions.setProfile( member ) );
	}


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
			<TextField fullWidth className={classes.textField} label={ PROFILE.NAME } value={profile.name} onChange={ e => handleChange( {name:e.target.value} ) } />
			<TextField fullWidth multiline className={classes.textField} rows={5} label={ PROFILE.DESCRIPTION } value={profile.description} onChange={ e => handleChange( { description:e.target.value } ) } />
			<FormControl className={classes.formField}>
				<FormLabel>{PROFILE.GENDER}</FormLabel>
				<RadioGroup value={profile.gender} onChange={e=>handleChange( { gender:e.target.value as Gender } )}>
					<FormControlLabel value="male" label="男性" control={<Radio color="primary" />} />
					<FormControlLabel value="female" label="女性" control={<Radio color="primary" />} />
				</RadioGroup>
			</FormControl>

			<TextField fullWidth className={classes.formField} label={PROFILE.BIRTHDAY} type="date" InputLabelProps={{shrink:true}} value={profile.birthday} onChange={ e => handleChange( { birthday:e.target.value } ) } />

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
		
		</Container>
	);

}


export default Basic;