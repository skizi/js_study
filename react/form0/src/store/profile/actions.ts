import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../domain/entity/profile";
// import { Career } from "../../domain/entity/career";

const actionCreator = actionCreatorFactory();

//reducer に渡す値（payload）の型（Profile）を指定
//Partial<Profile>はProfileの項目のうち、一部の値のみReducer内でpayloadとして渡すことができる
const profileActions = {
  setProfile: actionCreator<Profile>("SET_PROFILE"),
  // setCareer: actionCreator<{ career: Partial<Career>; index: number }>("SET_CAREER"),
  // deleteCareer: actionCreator<number>("DELETE_CAREER"),
  // addCareer: actionCreator<{}>("ADD_CAREER"),
};

export default profileActions;
