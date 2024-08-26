import { AUTH_TOKEN, LIKED_COUNT, LIKED_TOKEN } from "../constants";

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (val: string) => {
  localStorage.setItem(AUTH_TOKEN, val);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const setLiked = (action: string) => {
  localStorage.setItem(LIKED_TOKEN, action);
};

export const getLiked = () => {
  return localStorage.getItem(LIKED_TOKEN);
};

export const removeLiked = () => {
  localStorage.removeItem(LIKED_TOKEN);
};

