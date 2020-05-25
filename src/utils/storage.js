import {ACCESS_TOKEN} from "./constants"

export function addAccountToken(token) {
  sessionStorage.setItem(ACCESS_TOKEN, token);
}

export function clearAccountToken() {
  sessionStorage.clear(ACCESS_TOKEN);
}

