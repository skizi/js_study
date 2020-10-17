import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {TextField, Typography, InputLabel, Grid, Button} from "@material-ui/core";
import useStyles from "./styles";
import { RootState } from "../domain/entity/rootState";
import { PROFILE } from "../domain/services/profile";

import { Career as ICareer } from "../domain/entity/career";
import profileActions from "../store/profile/actions";

import { exitEmptyCareers } from "../domain/services/career";

import { calculateValidation } from "../domain/services/validation";
import validationActions from "../store/validation/actions";




const Career:React.FC = () =>{
	
	const classes = useStyles();

	const dispatch = useDispatch();
	const careers = useSelector( ( state:RootState) => state.profile.careers );

  const profile = useSelector((state: RootState) => state.profile);



  const handleChange = (member: Partial<ICareer>, i: number) => {
    dispatch(profileActions.setCareer({ career: member, index: i }));
    recalculateValidation(member, i);
  };

  const handleAddCareer = () => {
    if( exitEmptyCareers( careers ) ) return;

    dispatch(profileActions.addCareer({}));
  };

  const handleDeleteCareer = ( i:number ) => {
    dispatch(profileActions.deleteCareer(i));
  };


  const recalculateValidation = (member: Partial<ICareer>, i: number) => {
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



  const validation = useSelector((state: RootState) => state.validation);

  const isAbleToAddCarrer = exitEmptyCareers(careers);

	return(
		<>
      {careers.map((c, i) => (
        <Fragment key={i}>
          <Typography variant="h5" component="h3" className={classes.title}>
            職歴 {i + 1}
          </Typography>
          <TextField
            className={classes.formField}
            fullWidth
            label={PROFILE.CAREERS.COMPANY}
            value={c.company}
            onChange={ e=>{ handleChange( { company:e.target.value }, i ) } }
            error={!!validation.message.careers[i]?.company}
            helperText={validation.message.careers[i]?.company}
          />
          <TextField
            className={classes.formField}
            fullWidth
            label={PROFILE.CAREERS.POSITION}
            value={c.position}
            onChange={ e=>{ handleChange( { position:e.target.value }, i ) } }
            error={!!validation.message.careers[i]?.position}
            helperText={validation.message.careers[i]?.position}
          />
          <div className={classes.careerSpan}>
            <InputLabel shrink>{PROFILE.CAREERS.SPAN}</InputLabel>
            <Grid
              container
              spacing={1}
              alignContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="month"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={c.startAt}
                  onChange={ e=>{ handleChange( { startAt:e.target.value }, i ) } }
                  error={!!validation.message.careers[i]?.startAt}
                  helperText={validation.message.careers[i]?.startAt}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography align="center">〜</Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="month"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={c.endAt}
                  onChange={ e=>{ handleChange( { endAt:e.target.value }, i ) } }
                  error={!!validation.message.careers[i]?.endAt}
                  helperText={validation.message.careers[i]?.endAt}
                />
              </Grid>
            </Grid>
          </div>
          <Button
            className={classes.button}
            onClick={ () => { handleDeleteCareer(i) } }
            fullWidth
            variant="outlined"
            color="secondary"
          >
            職歴 {i + 1} を削除
          </Button>
        </Fragment>
      ))}

      <Button
        className={classes.button}
        onClick={handleAddCareer}
        fullWidth
        variant="outlined"
        disabled={isAbleToAddCarrer}
      >
        職歴を追加
      </Button>
		</>
	);
	

}


export default Career