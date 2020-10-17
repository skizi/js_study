import { Dispatch } from "redux";
import collegesActions from "./actions";

export const searchColleges = (name: string) => async (dispach: Dispatch) => {

console.log( name );
  const url = `http://localhost:18001/colleges?name=${name}`;

  const result = await fetch(url).then(res => res.json());
console.log( result );
  dispach(
    collegesActions.searchCollege.done({
      result: result.results.school,
      params: {}
    })
  );
};