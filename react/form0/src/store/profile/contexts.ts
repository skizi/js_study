import { createContext } from "react";
import { Address as IAddress } from "../../domain/entity/address";
// import { Address } from "../../domain/entity/address";
import { Gender } from "../../domain/entity/gender";



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
	changeProfile:(member:Partial<ProfileOnContext>)=>void;
	prefecture:string; //都道府県
	city:string; //市区町村
	restAddress:string; //残りの住所
	handleAddressChange:(member:Partial<IAddress>)=>void;
	handlePostalcodeChange:(code: string)=>void;
}


export const ProfileContext = createContext<Profile>(
	(null as any) as Profile
);



