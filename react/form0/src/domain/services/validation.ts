import { Profile } from "../entity/profile";
import { ValidationMessage } from "../entity/validation";
import { PROFILE } from "./profile";
import { College } from "../entity/college";
import { Career } from "../entity/career";

const isEmpty = (str: string): boolean => !str.trim();

// 必須項目
const emptyValidation = (target: string, col: string): string =>
  isEmpty(target) ? `${col}を入力してください。` : "";

const isTooLong = (str: string, maxLen: number): boolean =>
  str.trim().length >= maxLen;

// 文字数制限
const lengthValidation = (target: string, maxLen: number): string =>
  isTooLong(target, maxLen) ? `${maxLen}文字以下で入力してください。` : "";

const careerValidation = (careers: Career[]): Career[] =>
  careers.map((c) => ({
    company: emptyValidation(c.company, PROFILE.CAREERS.COMPANY),
    position: emptyValidation(c.position, PROFILE.CAREERS.POSITION),
    startAt: emptyValidation(c.startAt, PROFILE.CAREERS.START_AT),
    endAt: emptyValidation(c.endAt, PROFILE.CAREERS.END_AT),
  }));

const facultyValidation = (college: College): string =>
  college.name && !college.faculty
    ? `${PROFILE.COLLEGE.FACULTY}を入力してください。`
    : "";

// 再帰的にObjectを配列に
const extractValues = (obj: any): any[] | string => {
  if (typeof obj === "string") return obj;
  return Object.values(obj).map(extractValues);
};

export const isValid = (message: ValidationMessage): boolean => {
  const falttenValues = Object.values(message)
    .map(extractValues)
    .flat(Infinity) as string[]; //yoshida edit
  console.log(falttenValues);
  return falttenValues.every((fv) => !fv);
};

export const calculateValidation = (profile: Profile): ValidationMessage => {
  const message: ValidationMessage = {
    basic: {
      name: emptyValidation(profile.basic.name, PROFILE.BASIC.NAME),
      description: lengthValidation(profile.basic.description, 1000),
      birthday: emptyValidation(profile.basic.birthday, PROFILE.BASIC.BIRTHDAY),
      gender: emptyValidation(profile.basic.gender, PROFILE.BASIC.GENDER),
    },
    address: {
      postalcode: emptyValidation(
        profile.address.postalcode,
        PROFILE.ADDRESS.POSTALCODE
      ),
      prefecture: emptyValidation(
        profile.address.prefecture,
        PROFILE.ADDRESS.PREFECTURE
      ),
      city: emptyValidation(profile.address.city, PROFILE.ADDRESS.CITY),
      restAddress: emptyValidation(
        profile.address.restAddress,
        PROFILE.ADDRESS.RESTADDRESS
      ),
    },
    // collegeおよびcareersに関しては次のパート以降で実装
    college: {
      faculty: facultyValidation(profile.college),
    },
    careers: careerValidation(profile.careers),
  };
  console.log(message);
  return message;
};
