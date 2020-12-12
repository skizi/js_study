import axios from "axios";

/**
 * ZipAddressApi - object-oriented interface
 * @export
 * @class ZipAddressApi
 */
export default class ZipAddressApi {
  public async zipcodeToAddress(zipcode: string): any {
    const response = await axios
      .get("https://api.zipaddress.net", { params: { zipcode: zipcode } })
      .then((response) => {
        return { status: "success", data: response };
      })
      .catch((error) => {
        return { status: "error", data: error };
      });

    return response;
  }
}

export interface CurrentUser {
  address: string;
}
