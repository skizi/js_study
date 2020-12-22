import { useState, useRef, useEffect } from "react";
import { Profile } from "../../domain/entity/profile";
import { Address } from "../../domain/entity/address";
import { isPostalcode } from "../../domain/services/address";

import {
  isCompletePostalcode,
  sanitizePostalcode,
} from "../../domain/services/address";

export const useAddress = (
  profile: Profile,
  recalculateValidation: (profile: Profile) => void
) => {
  const [address, setAddress] = useState<Address>(profile.address);

  //------------------郵便番号から住所検索------------------
  //メモリリーク対策
  const mountedRef = useRef<boolean>(false);
  useEffect(() => {
    mountedRef.current = true;
    return (): void => {
      mountedRef.current = false;
    };
  }, []);

  const [loadingFlag, setLoadingFlag] = useState(false);
  const searchAddress = (code: string): void => {
    if (!isCompletePostalcode(code)) {
      setLoadingFlag(false);
      return;
    }

    setLoadingFlag(true);
    const load = async (): Promise<void> => {
      let _address = { ...address, postalcode: code };
      try {
        const res = await fetch(
          `https://apis.postcode-jp.com/api/v3/postcodes?apikey=lcuwhB4B0wdE0Rx7wB7BfEl5flLYzjs7NJmtFpw&postcode=${sanitizePostalcode(
            code
          )}`
        );
        const result = await res.json();

        if (result.data[0] && mountedRef.current) {
          const partial: Partial<Address> = {
            prefecture: result.data[0].pref,
            city: result.data[0].city + result.data[0].town,
          };
          _address = { ..._address, ...partial };
        }
      } catch (error) {
        throw error;
      } finally {
        setLoadingFlag(false);
        setAddress(_address);
      }
    };
    void load();
  };
  const handlePostalcodeChange = (code: string): void => {
    if (!isPostalcode(code)) return;

    searchAddress(code);
    recalculateValidation({
      ...profile,
      address: { ...address, postalcode: code },
    });
  };

  //------------------住所更新------------------
  const handleAddressChange = (member: Partial<Address>): void => {
    setAddress({ ...address, ...member });
    recalculateValidation({ ...profile, address: { ...address, ...member } });
  };

  return { address, handleAddressChange, handlePostalcodeChange, loadingFlag };
};
