import request from '@/utils/request'

export function login(username, password) {
  return request.member({
    url: '/user/adminLogin?username=' + username + '&password=' + password,
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
