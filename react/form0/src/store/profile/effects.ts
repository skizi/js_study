import { Dispatch } from "redux";
import profileActions from "./actions";
import { Address } from "../../domain/entity/address";

import {
  isCompletePostalcode,
  sanitizePostalcode
} from "../../domain/services/address";



export const searchAddressFromPostalcode = (code: string) => async( dispach: Dispatch ) => {

  if (!isCompletePostalcode(code)) return;

  dispach(profileActions.setAddress({ postalcode: code }));


  const res = await fetch(
    `https://apis.postcode-jp.com/api/v3/postcodes?apikey=lcuwhB4B0wdE0Rx7wB7BfEl5flLYzjs7NJmtFpw&postcode=${sanitizePostalcode(code)}`
  );
  const result = await res.json();

  if (!result.data[0]) return;

  const address: Partial<Address> = {
    prefecture: result.data[0].pref,
    city: result.data[0].city + result.data[0].town
  };

  dispach(profileActions.searchAddress.done({ result: address, params: {} }));
};






export const searchColleges = (name: string) => async (dispach: Dispatch) => {

console.log( name );
  const url = `http://localhost:18001/colleges?name=${name}`;

  const result = await fetch(url).then(res => res.json());
console.log( result );
  dispach(
    profileActions.searchCollege.done({
      result: result.results.school,
      params: {}
    })
  );
};