import actionCreatorFactory from "typescript-fsa";
import { ValidationMessage } from "../../domain/entity/validation";

const actionCreator = actionCreatorFactory();

const validationActions = {
  setIsStartvalidation: actionCreator<boolean>("SET_IS_START_VALIDATION"),
  setValidation: actionCreator<ValidationMessage>("SET_VALIDATION"),
};

export default validationActions;
