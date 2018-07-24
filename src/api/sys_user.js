import request from '@/utils/request'
import {
  getCookies,
  setCookies,
  removeCookies
} from '@/utils/cookies'

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

// 修改父模块
export function updateParentModel(modelInfo) {
  return request.member({
    url: '/user/updateParentModel',
    method: 'get',
    params: modelInfo
  })
}

// 给角色 配置权限
export function addRoleBondPermission(params) {
  return request.member({
    url: '/user/addRoleBondPermission',
    method: 'post',
    params: {
      params
    }
  })
}

//获取表单数据
export function findAgentInfoByAccount(account,isMonth) {
  return request.member({
    url:'/user/findAgentInfoByAccount',
    method:'get',
    params:{
      account,
      isMonth
    }
  })
}

//导出表格
export function exportExcle(listParams,title) {
  return request.member({
    url:'/user/exportExcle',
    method:'post',
    params:{
      listParams,
      title
    }
  })
}

// 获取代理和渠道列表
export function findAllAgentAndQD() {
  return request.member({
    url: '/user/findAllAgentAndQD',
    method: 'get',
  })
}

// 获取所有会员列表
export function findAllMember(page) {
  return request.member({
    url: '/user/findAllMember',
    method: 'get',
    params:{
      page,
      pageSize:20
    }
  })
}
// 会员设置为渠道
export function handleEdit(params) {
  return request.member({
    url: '/user/updateMemberToQD',
    method: 'get',
    params: params
  })
}
//  给代理绑定渠道
export function addAgency(params) {
  return request.member({
    url: '/user/addAgentToQD',
    method: 'get',
    params: {
      params
    }
  })
}

// 开户轮播墙

export function openAccountWall(loginAccount) {
  return request.member({
    url: '/userCount/findAccountWall',
    method: 'get',
    params: {
      loginAccount
    }
  })
}
// 激活轮播墙

export function findAccountActiveWall(loginAccount) {
  return request.member({
    url: '/userCount/findAccountActiveWall',
    method: 'get',
    params: {
      loginAccount
    }
  })
}
// 充值消费轮播墙
export function findRechargeAndConsumerWall(params) {
  return request.member({
    url: '/userCount/findRechargeAndConsumerWall',
    method: 'get',
    params: 
      params
    
  })
}
