import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";

import { PROFILE } from "../domain/services/profile";
import useStyles from "./styles";

import { RootState } from "../domain/entity/rootState";




import { ProfileContext } from "../store/profile/contexts";



const Address:React.FC = () => {

	const dispatch = useDispatch();
	const profile = useSelector( (state:RootState)=> state.profile );
	const { prefecture, city, restAddress, handleAddressChange, handlePostalcodeChange } = useContext(ProfileContext);

  	const classes = useStyles();

	const validation = useSelector((state: RootState) => state.validation);
  

	return(
		<>
			<TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.POSTALCODE} onChange={e=>handlePostalcodeChange( e.target.value )}
	        required
	        error={!!validation.message.address.postalcode}
	        helperText={validation.message.address.postalcode} />
			<TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.PREFECTURE} value={prefecture} onChange={e=>handleAddressChange( { prefecture:e.target.value } )}
	        required
	        error={!!validation.message.address.prefecture}
	        helperText={validation.message.address.prefecture} />
			<TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.CITY} value={city} onChange={e=>handleAddressChange( { city:e.target.value } )}
	        required
	        error={!!validation.message.address.city}
	        helperText={validation.message.address.city} />
			<TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.RESTADDRESS} value={restAddress} onChange={e=>handleAddressChange( { restAddress:e.target.value } )}
	        error={!!validation.message.address.restAddress}
	        helperText={validation.message.address.restAddress} />
		</>
	);

}


export default Address;