const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return localStorage[TokenKey]
}

export function setToken(token) {
  localStorage[TokenKey] = token
}

export function removeToken() {
  delete localStorage[TokenKey]
}
