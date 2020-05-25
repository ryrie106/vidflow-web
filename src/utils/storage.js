import {ACCESS_TOKEN} from "./constants"

export function addAccountToken(token) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

export function clearAccountToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}

