import { Profile } from "./profile";
import { ValidationState } from "./validation";
import { AlertState } from "./alert";



export type RootState = {
	profile:Profile;
	validation: ValidationState;
	alert: AlertState;
}