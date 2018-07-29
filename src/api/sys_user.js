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
// 会员设置渠道
export function handleEdit(params) {
  return request.member({
    url: '/user/updateMemberToQD',
    method: 'get',
    params: params
  })
}
// 会员设置代理
export function setMemberToAgent(params) {
  return request.member({
    url: '/userManage/setMemberToAgent',
    method: 'get',
    params: params
  })
}
//  给渠道绑定代理
export function addAgency(params) {
  return request.member({
    url: '/user/addAgentToQD',
    method: 'get',
    params: {
      params
    }
  })
}
//  将渠道或代理降级为会员
export function setAgentToMember(params) {
  return request.member({
    url: '/userManage/setAgentToMember',
    method: 'get',
    params: params
  })
}
//  将代理升级为渠道
export function upgradeAgentToQD(params) {
  return request.member({
    url: '/user/upgradeAgentToQD',
    method: 'get',
    params: params
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
// 会员返点列表
export function findAllRate(page, pageSize) {
  return request.member({
    url: '/userManage/findAllRate',
    method: 'get',
    params: {
      page,
      pageSize:20,
      account:''
    }
  })
}
// 会员返点修改
export function updateRateByAccount(params) {
  return request.member({
    url: '/userManage/updateRateByAccount',
    method: 'get',
    params: params
  })
}
// 设置返点
export function setRate(account, rateParams) {
  return request.member({
    url: '/userManage/setRate',
    method: 'get',
    params: {
      account,
      rateParams
    }
  })
}
// 删除返点
export function delRateByAccount(params) {
  return request.member({
    url: '/userManage/delRateByAccount',
    method: 'get',
    params: params
  })
}
// 根据账号查找下级人员
export function getSubordinateMember(params) {
  return request.member({
    url: '/userManage/getSubordinateMember',
    method: 'get',
    params: params
  })
}
//授信表数据
export function getCreditMember(params) {
  return request.member({
    url: '/user/getCreditMember',
    method: 'get',
    params: params
  })
}
//授信
export function credit(params) {
  return request.pay({
    url: '/xxPay/credit',
    method: 'get',
    params: params
  })
}
//授信操作记录
export function getCreditLimitLine(params) {
  return request.pay({
    url: '/xxPay/getCreditLimitLine',
    method: 'get',
    params: params
  })
}
//代理给客户加款流水
export function getAgentChargeLine(params) {
  return request.pay({
    url: '/xxPay/getAgentChargeLine',
    method: 'get',
    params: params
  })
}
//获取代理还款申请/记录
export function getCreditRefund(params) {
  return request.pay({
    url: '/xxPay/getCreditRefund',
    method: 'get',
    params: params
  })
}
//通过还款申请
export function passCreditRefundApply(params) {
  return request.pay({
    url: '/xxPay/passCreditRefundApply',
    method: 'get',
    params: params
  })
}
//驳回还款申请
export function refuseCreditRefundApply(params) {
  return request.pay({
    url: '/xxPay/refuseCreditRefundApply',
    method: 'get',
    params: params
  })
}
//查询所有支付方式
export function findPaySwitch() {
  return request.member({
    url: 'userCount/findPaySwitch',
    method: 'get',
  })
}
//支付修改
export function addPaySwitch(params) {
  return request.member({
    url: '/userCount/addPaySwitch',
    method: 'get',
    params:params
  })
}
//线下充值加款明细
export function findRechargeUnderLine(params) {
  return request.member({
    url: '/user/findRechargeUnderLine',
    method: 'get',
    params:params
  })
}
//支线下充值明细 充值功能
export function xxCharge(params) {
  return request.pay({
    url: '/xxPay/xxCharge',
    method: 'get',
    params:params
  })
}
//线上充值流水 
export function findRechargeOnLine(params) {
  return request.member({
    url: 'user/findRechargeOnLine',
    method: 'get',
    params:params
  })
}
//会员充值流水查询--总表
export function findMemberWalletLineByAccount(params ) {
  return request.member({
    url: '/user/findMemberWalletLineByAccount',
    method: 'get',
    params:params
  })
}
//获取所有充值失败的订单
export function getAllFailPayOrder(params) {
  return request.pay({
    url: '/pay/getAllFailPayOrder',
    method: 'get',
    params:params
  })
}
//充值补单
export function chargeFix(params) {
  return request.pay({
    url: '/pay/chargeFix',
    method: 'get',
    params:params
  })
}
//资金冲正
export function chargeRight(params) {
  return request.pay({
    url: 'pay/chargeRight',
    method: 'get',
    params:params
  })
}
