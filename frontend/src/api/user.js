import { API_HOST, VIEWPROFILE } from "../utils/constants";
import { getTokenApi } from "./auth";

export default function getUserApi(id) {
  const url = API_HOST + VIEWPROFILE + "?idUser=" + id;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
