import { Career } from "../entity/career";

const isEmptyCareer = (career: Career): boolean => {
  return Object.values(career).every((v) => !v);
};

export const exitEmptyCareers = (careers: Career[]): boolean =>
  careers.some((c) => isEmptyCareer(c));
