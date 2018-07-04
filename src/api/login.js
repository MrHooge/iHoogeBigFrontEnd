import request from '@/utils/request'

export function login(username, password) {
  return request.member({
    url: '/user/adminLogin',
    method: 'get',
    params: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getMenu(id) {
  return request.member({
    url: '/user/findAllParentModel',
    method: 'get',
    params: { id }
  })
}

export function getChildMenu(id) {
  return request.member({
    url: '/user/findAllChildModel',
    method: 'get',
    params: { id }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
