import { API_HOST, GETALLTWEETS, GETTWEETS, INSERTTWEET } from "../utils/constants";
import { getTokenApi } from "./auth";

export default function addTweetApi(message) {
  const url = API_HOST + INSERTTWEET;
  const data = {
    message: message,
  };

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return { code: response.status, message: "Tweet publicado" };
      }

      return { code: 500, message: "Error del servidor" };
    })
    .catch((err) => {
      return err;
    });
}

export function getTweetsApi(idUser, page) {
  const url = API_HOST + GETTWEETS + "?idUser=" + idUser + "&page=" + page;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getTweetsFollowersApi(page = 1) {
  const url = API_HOST + GETALLTWEETS + "?page=" + page;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}