import Cookies from 'js-cookie'

export function getCookies(cookiesKey) {
  return Cookies.get(cookiesKey)
}

export function setCookies(cookiesKey, cookies) {
  return Cookies.set(cookiesKey, cookies)
}

export function removeCookies(cookiesKey) {
  return Cookies.remove(cookiesKey)
}
