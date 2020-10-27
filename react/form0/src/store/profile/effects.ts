import { useState, useCallback, useRef, useEffect } from "react";
import { Dispatch } from "redux";
import profileActions from "./actions";
import { Address } from "../../domain/entity/address";

import {
  isCompletePostalcode,
  sanitizePostalcode
} from "../../domain/services/address";



export const useSearchAddress = ( address:Address, setAddress:React.Dispatch<React.SetStateAction<Address>> ) => {

  //メモリリーク対策
  const mountedRef = useRef<boolean>(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  },[]);


  const [loadingFlag, setLoadingFlag] = useState(false);
  const getAddress = ( code:string )=>{

    if (!isCompletePostalcode(code)){
      setLoadingFlag( false );
      return;
    }

    setLoadingFlag( true );
    const load = async ():Promise<void> => {

      try{
        const res = await fetch(`https://apis.postcode-jp.com/api/v3/postcodes?apikey=lcuwhB4B0wdE0Rx7wB7BfEl5flLYzjs7NJmtFpw&postcode=${sanitizePostalcode(code)}`);
        const result = await res.json();

        if (result.data[0] && mountedRef.current){
          const _address: Partial<Address> = {
            prefecture: result.data[0].pref,
            city: result.data[0].city + result.data[0].town
          };
          setAddress({ ...address, ..._address });
        }

      }catch( error ){
        throw error;
      }finally{
        setLoadingFlag( false );
      }

    }
    void load();

  };

  return { getAddress, loadingFlag };

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