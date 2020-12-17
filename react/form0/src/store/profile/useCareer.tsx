import { useState } from "react";
import { Career } from "../../domain/entity/career";
import { Profile } from "../../domain/entity/profile";
import { exitEmptyCareers } from "../../domain/services/career";

export const useCareer = (
  profile: Profile,
  recalculateValidation: (profile: Profile) => void
) => {
  const [careers, setCareer] = useState<Career[]>(profile.careers);
  const initCareer: Career = {
    company: "",
    position: "",
    startAt: "",
    endAt: "",
  };

  const handleChangeCareer = (member: Partial<Career>, index: number) => {
    const _careers = careers.map((item, i) => {
      return i === index ? { ...item, ...member } : item;
    });
    setCareer(_careers);
    recalculateValidation({ ...profile, careers: _careers });
  };

  const handleAddCareer = () => {
    if (exitEmptyCareers(careers)) return;
    setCareer([...careers, initCareer]);
  };

  const handleDeleteCareer = (index: number) => {
    const _careers = careers.filter((item, i) => {
      return i !== index;
    });
    setCareer(_careers);
  };

  return { careers, handleChangeCareer, handleAddCareer, handleDeleteCareer };
};
