import actionCreatorFactory from "typescript-fsa";
import { Basic } from "../../domain/entity/basic";
import { Address } from "../../domain/entity/address";
import { Career } from "../../domain/entity/career";
import { College } from "../../domain/entity/college";
import { CollegeResult } from "../../domain/entity/college";

const actionCreator = actionCreatorFactory();


//reducer に渡す値（payload）の型（Profile）を指定
//Partial<Profile>はProfileの項目のうち、一部の値のみReducer内でpayloadとして渡すことができる
const profileActions = {
	// setCareer: actionCreator<{ career: Partial<Career>; index: number }>("SET_CAREER"),
	// deleteCareer: actionCreator<number>("DELETE_CAREER"),
	// addCareer: actionCreator<{}>("ADD_CAREER"),
};


export default profileActions;