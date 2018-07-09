import request from '@/utils/request'

export function findAllRole(role_id) {
  return request.member({
    url: '/user/findAllRole',
    method: 'get',
    params: {
      role_id
    }
  })
}

// 查询用户权限
export function findRoleAndPermission(account) {
  return request.member({
    url: '/user/findRoleAndPermission',
    method: 'get',
    params: {
      account
    }
  })
}

// 添加角色
export function addRole(roleInfos) {
  return request.member({
    url: '/user/addRole',
    method: 'get',
    params: roleInfos
  })
}

export function findAllUserAndRole(id, page, pageSize) {
  return request.member({
    url: '/user/findAllUserAndRole',
    method: 'get',
    params: {
      id,
      page,
      pageSize
    }
  })
}
// 修改账号
export function updateUserInfo(userInfos) {
  return request.member({
    url: '/user/updateUserInfo',
    method: 'get',
    params: userInfos
  })
}
// 添加账号
export function addUser(userInfos) {
  return request.member({
    url: '/user/addUser',
    method: 'get',
    params: userInfos
  })
}
// 删除账号
export function delUser(user_id) {
  return request.member({
    url: '/user/delUser',
    method: 'get',
    params: {
      user_id
    }
  })
}

// 查询所有父模块
export function findAllParentModel(id) {
  return request.member({
    url: '/user/findAllParentModel',
    method: 'get',
    params: {
      id
    }
  })
}

// 查询所有权限
export function findAllChildModel(id, page, pageSize) {
  return request.member({
    url: '/user/findAllChildModel',
    method: 'get',
    params: {
      id,
      page,
      pageSize
    }
  })
}

// 修改权限
export function updateChildModelInfo(modeInfo) {
  return request.member({
    url: '/user/updateChildModelInfo',
    method: 'get',
    params: modeInfo
  })
}

// 添加权限
export function addPermission(modeInfo) {
  return request.member({
    url: '/user/addPermission',
    method: 'get',
    params: modeInfo
  })
}

// 添加模块addParentModel
export function addParentModel(modelInfo) {
  return request.member({
    url: '/user/addParentModel',
    method: 'get',
    params: modelInfo
  })
}

// http://localhost:8081/user/updateParentModel
export function updateParentModel(modelInfo) {
  return request.member({
    url: '/user/updateParentModel',
    method: 'get',
    params: modelInfo
  })
}
