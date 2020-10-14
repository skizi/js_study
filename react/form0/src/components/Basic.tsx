import React from "react";
import {TextField} from "@material-ui/core";
import useStyles from "./styles";


const Basic = () => {

	const classes = useStyles();


	return (
		<>
			<TextField fullWidth className={classes.textField} label="名前" />
			<TextField fullWidth multiline className={classes.textField} rows={5} label="自己紹介" />
		</>
	);

}


export default Basic;