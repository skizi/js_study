import { createContext } from "react";
import { Address as IAddress } from "../../domain/entity/address";
// import { Address } from "../../domain/entity/address";
import { Gender } from "../../domain/entity/gender";
import { Career } from "../../domain/entity/career";
import { College } from "../../domain/entity/college";
import { ValidationState } from "../../domain/entity/validation";


type Address= {
	prefecture:string; //都道府県
	city:string; //市区町村
	restAddress:string; //残りの住所
	handleAddressChange:(member:Partial<IAddress>)=>void;
	handlePostalcodeChange:(code: string)=>void;
}


export const AddressContext = createContext<Address>(
	(null as any) as Address
);

export type ProfileOnContext = {
	name:string;
	description:string;
	birthday:string;
	gender:Gender;
}

export type Profile= {
	//Profile
	handleBasicProfileChange:(member:Partial<ProfileOnContext>)=>void;

	//Address
	prefecture:string; //都道府県
	city:string; //市区町村
	restAddress:string; //残りの住所
	handleAddressChange:(member:Partial<IAddress>)=>void;
	handlePostalcodeChange:(code: string)=>void;

	//Career
    handleChangeCareer:(member: Partial<Career>, i: number)=>void;
    handleAddCareer:()=>void;
    handleDeleteCareer:(i:number)=>void;

    //College
    handleChangeCollege:(member:Partial<College>)=>void;
    handleSearchCollege:(searchWord:string)=>void;
    handleResetCollege:()=>void;

    validation:ValidationState;
}


export const ProfileContext = createContext<Profile>(
	(null as any) as Profile
);



