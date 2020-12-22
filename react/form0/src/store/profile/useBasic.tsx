import { useState } from "react";
import { Basic } from "../../domain/entity/basic";
import { Profile } from "../../domain/entity/profile";

export const useBasic = (
  profile: Profile,
  recalculateValidation: (profile: Profile) => void
) => {
  const [basic, setBasic] = useState<Basic>(profile.basic);

  const handleBasicProfileChange = (member: Partial<Basic>): void => {
    // const key:string = Object.keys(member)[0];
    // const _member:any = member as any;

    // setBasic( { ...basic, [key]:_member[key] } );
    const _basic = { ...basic, ...member };
    setBasic(_basic);
    recalculateValidation({ ...profile, basic: _basic });
  };

  return { basic, handleBasicProfileChange };
};
