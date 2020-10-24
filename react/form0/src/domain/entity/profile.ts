import { Basic } from "./basic";
import { Address } from "./address";
import { Career } from "./career";
import { College } from "./college";

export type Profile = {
	basic:Basic;
	address:Address;
	careers:Career[];
	college:College;
}