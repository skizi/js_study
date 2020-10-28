import React, { useState, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography } from "@material-ui/core";

import { PROFILE } from "../../domain/services/profile";
import { RootState } from "../../domain/entity/rootState";
import useStyles from "../styles";

import { ProfileContext } from "../../store/profile/contexts";



const College:React.FC = () => {

	const [ searchWord, setSearchWord ] = useState("");

	const handleChange = ( name:string ) => {
		setSearchWord( name )
	}

    const { handleChangeCollege, handleSearchCollege, handleResetCollege, validation, college } = useContext(ProfileContext);



	const currentCollege = React.useMemo(() => {
		return college.result.filter(
			c => c.name === college.name
		)[0];
	}, [college.result, college.name]);

	const currentFaculty = currentCollege?.faculty.filter(
		f => f.name === college.faculty
	)[0];

  	const classes = useStyles();

  


  	// return useMemo(() => {
		return (
		  <>
	        <Typography
	        variant="h4"
	        component="h2"
	        className={classes.title}
	        color="primary"
	        >
	          学歴
	        </Typography>

		    {!college.name && (
		      	<>
					<TextField
					className={classes.formField}
					fullWidth
					label="大学名を検索"
					onChange={e => handleChange(e.target.value)}
					/>
					<Button
					className={classes.button}
					onClick={ () => handleSearchCollege( searchWord ) }
					fullWidth
					variant="outlined"
					color="primary"
		            disabled={!searchWord}
					>
					検索
					</Button>

					<Grid spacing={1} container>
						{college.result.map(c => (
						  <Grid key={c.name} item>
						    <Button
						      variant="outlined"
						      color="primary"
						      onClick={() => handleChangeCollege({ name: c.name })}
						    >
						      {c.name}
						    </Button>
						  </Grid>
						))}
					</Grid>
				</>
			)}

		    {college.name && (
				<>
					<TextField
					className={classes.formField}
					label={PROFILE.COLLEGE.NAME}
					fullWidth
					value={college.name}
					disabled
					/>
					<FormControl fullWidth className={classes.formField}
		            error={!!validation.message.college.faculty}>
						<InputLabel>{PROFILE.COLLEGE.FACULTY}</InputLabel>
						<Select
						  value={college.faculty}
						  onChange={e =>
						    handleChangeCollege({
						      faculty: e.target.value as string,
			                  department: ""
						    })
						  }
						>
						  {currentCollege.faculty.map(f => (
						    <MenuItem key={f.name} value={f.name}>
						      {f.name}
						    </MenuItem>
						  ))}
						</Select>
					</FormControl>

					{currentFaculty?.department.length > 0 && (
						<FormControl fullWidth className={classes.formField}>
						  <InputLabel>{PROFILE.COLLEGE.DEPARTMENT}</InputLabel>
						  <Select
						    value={college.department}
						    onChange={e =>
						      handleChangeCollege({ department: e.target.value as string })
						    }
						  >
						    {currentFaculty.department.map(d => (
						      <MenuItem key={d} value={d}>
						        {d}
						      </MenuItem>
						    ))}
						  </Select>
						</FormControl>
					)}

					<div>{college.name}が選択されています。</div>
					<Button
					fullWidth
					className={classes.button}
					onClick={()=>{
						handleResetCollege();
						setSearchWord("");
					}}
					variant="outlined"
					color="secondary"
					>
					学歴の入力情報をリセット
					</Button>
				</>
			)}	

		  </>
		);
	// }, [validation.message.college, college, searchWord]);

}


export default React.memo(College);