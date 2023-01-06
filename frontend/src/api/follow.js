import { API_HOST, CHECKFOLLOW, FOLLOW, UNFOLLOW } from "../utils/constants";
import { getTokenApi } from "./auth";

export default function checkFollowApi(id) {
  const url = API_HOST + CHECKFOLLOW + "?idUserRelation=" + id;

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

export function followUserApi(id) {
  const url = API_HOST + FOLLOW + "?idUserRelation=" + id;

  const params = {
    method: "POST",
    headers: {
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

export function unfollowUserApi(id) {
  const url = API_HOST + UNFOLLOW + "?idRelation=" + id;

  const params = {
    method: "DELETE",
    headers: {
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
