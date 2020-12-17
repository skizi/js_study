import { Profile } from "./profile";
import { Validation } from "./validation";
import { Alert } from "./alert";

export type RootState = {
  profile: Profile;
  validation: Validation;
  alert: Alert;
};
