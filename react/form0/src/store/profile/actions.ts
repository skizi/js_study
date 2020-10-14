import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../domain/entity/profile";

const actionCreator = actionCreatorFactory();


//reducer に渡す値（payload）の型（Profile）を指定
//Partial<Profile>はProfileの項目のうち、一部の値のみReducer内でpayloadとして渡すことができる
const profileActions = {
	setProfile: actionCreator<Partial<Profile>>("SET_PROFILE")
};


export default profileActions;