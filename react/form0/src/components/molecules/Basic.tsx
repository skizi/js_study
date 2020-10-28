import React, { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import {TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, FormHelperText} from "@material-ui/core";
import useStyles from "../styles";
import { RootState } from "../../domain/entity/rootState";

import { Gender } from "../../domain/entity/gender";
import { PROFILE } from "../../domain/services/profile";


import { ProfileContext } from "../../store/profile/contexts";



const Basic = () => {

	const classes = useStyles();
 	
	const { handleBasicProfileChange, validation, basic } = useContext(ProfileContext);


	//useMemoの影響でProfileのsetBasicが機能していなかった模様
  	return useMemo(() => {
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
				<TextField fullWidth className={classes.textField} label={ PROFILE.BASIC.NAME } onChange={ e => handleBasicProfileChange( { name:e.target.value } ) }
		        required
		        error={!!validation.message.basic.name}
		        helperText={validation.message.basic.name} />
				
				<TextField fullWidth multiline className={classes.textField} rows={5} label={ PROFILE.BASIC.DESCRIPTION } onChange={ e => handleBasicProfileChange( { description:e.target.value } ) }
			    error={!!validation.message.basic.description}
			    helperText={validation.message.basic.description} />
				
				<FormControl className={classes.formField}
		        error={!!validation.message.basic.gender}
		        required>
					<FormLabel>{PROFILE.BASIC.GENDER}</FormLabel>
					<RadioGroup onChange={e=>handleBasicProfileChange( { gender:e.target.value as Gender } )}>
						<FormControlLabel value="male" label="男性" control={<Radio color="primary" />} />
						<FormControlLabel value="female" label="女性" control={<Radio color="primary" />} />
					</RadioGroup>
				</FormControl>

				<TextField fullWidth className={classes.formField} label={PROFILE.BASIC.BIRTHDAY} type="date" InputLabelProps={{shrink:true}} onChange={ e => handleBasicProfileChange( { birthday:e.target.value } ) }
		        required
		        error={!!validation.message.basic.birthday} />
			</>
		);
	}, [validation.message.basic, basic]);
}


export default React.memo(Basic);