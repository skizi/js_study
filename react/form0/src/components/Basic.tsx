import React, { useContext } from "react";
import { useSelector } from "react-redux";
import {TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, FormHelperText} from "@material-ui/core";
import useStyles from "./styles";
import { RootState } from "../domain/entity/rootState";

import { Gender } from "../domain/entity/gender";
import { PROFILE } from "../domain/services/profile";


import { ProfileContext } from "../store/profile/contexts";



const Basic = () => {

	const classes = useStyles();
 	
	const { handleBasicProfileChange, validation } = useContext(ProfileContext);



	return (
		<>
			<Typography
			variant="h4"
			component="h2"
			className={classes.title}
			color="primary"
			>
	        	基本情報
			</Typography>
			<TextField fullWidth className={classes.textField} label={ PROFILE.NAME } onChange={ e => handleBasicProfileChange( { name:e.target.value } ) }
	        required
	        error={!!validation.message.name}
	        helperText={validation.message.name} />
			
			<TextField fullWidth multiline className={classes.textField} rows={5} label={ PROFILE.DESCRIPTION } onChange={ e => handleBasicProfileChange( { description:e.target.value } ) }
		    error={!!validation.message.description}
		    helperText={validation.message.description} />
			
			<FormControl className={classes.formField}
	        error={!!validation.message.gender}
	        required>
				<FormLabel>{PROFILE.GENDER}</FormLabel>
				<RadioGroup onChange={e=>handleBasicProfileChange( { gender:e.target.value as Gender } )}>
					<FormControlLabel value="male" label="男性" control={<Radio color="primary" />} />
					<FormControlLabel value="female" label="女性" control={<Radio color="primary" />} />
				</RadioGroup>
			</FormControl>

			<TextField fullWidth className={classes.formField} label={PROFILE.BIRTHDAY} type="date" InputLabelProps={{shrink:true}} onChange={ e => handleBasicProfileChange( { birthday:e.target.value } ) }
	        required
	        error={!!validation.message.birthday} />
		</>
	);

}


export default Basic;