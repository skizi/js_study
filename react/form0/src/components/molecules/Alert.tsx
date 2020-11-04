import React,{ useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import { RootState } from "../../domain/entity/rootState";
import { Snackbar } from "@material-ui/core";

import alertActions from "../../store/alert/actions";

import { ProfileContext } from "../../store/profile/contexts";

const Alert = () => {

  const { handleAlertClose, alert } = useContext(ProfileContext);

  return (
    <Snackbar open={alert.open} onClose={handleAlertClose}>
      <MuiAlert elevation={6} variant="filled" severity={alert.severity}>
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;