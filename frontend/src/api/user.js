import {
  API_HOST,
  MODIFYPROFILE,
  UPLOADAVATAR,
  UPLOADBANNER,
  VIEWPROFILE,
} from "../utils/constants";
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

export function uploadBannerApi(file) {
  const url = API_HOST + UPLOADBANNER;

  const formData = new FormData();
  formData.append("banner", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
    body: formData,
  };

  return fetch(url, params)
    .then((response) => {
      if (response) return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function uploadAvatarApi(file) {
  const url = API_HOST + UPLOADAVATAR;

  const formData = new FormData();
  formData.append("picture", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
    body: formData,
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

export function modifyProfileApi(data) {
  const url = API_HOST + MODIFYPROFILE;

  const params = {
    method: "PUT",
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
    body: JSON.stringify(data),
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
