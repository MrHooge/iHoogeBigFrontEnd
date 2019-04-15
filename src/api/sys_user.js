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
// 提款申请页面短信开关
export function updatePayMessageSwitch(data) {
  return request.pay({
    url: '/pay/updatePayMessageSwitch',
    method: 'get',
    params: data
  })
}
// 查询提款申请页面短信开关
export function findPayMessageSwitch(data) {
  return request.pay({
    url: '/pay/findPayMessageSwitch',
    method: 'get',
    params: data
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
//添加打票人员
export function addTicketUser(account) {
  return request.ticket({
    url: '/ticketSystem/addTicketUser',
    method: 'get',
    params: {
      account
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
export function addRoleBondPermission(userInfos) {
  var params = new URLSearchParams();
  params.append('value', JSON.stringify(userInfos));
  return request.member({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/user/addRoleBondPermission',
    method: 'post',
    data: JSON.stringify(userInfos)
  })
}
//支付信息
export function getpayinfo(obj) {
  return request.pay({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/QrCodePay/insertQrPayInfo',
    method: 'post',
    data: obj
  })
}
//查询支付信息
export function searchpayinfo(obj) {
  return request.pay({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/QrCodePay/findQrPayInfo',
    method: 'post',
    data: obj
  })
}
//修改支付信息
export function setpayinfo(obj) {
  return request.pay({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/QrCodePay/updateQrPayInfo',
    method: 'post',
    data: obj
  })
}
//获取表单数据
export function findAgentInfoByAccount(userInfos) {
  return request.member({
    url: '/user/findAgentInfoByAccount',
    method: 'get',
    params: userInfos
  })
}

//导出表格
export function exportExcle(listParams, title) {
  return request.member({
    url: '/user/exportExcle',
    method: 'post',
    params: {
      listParams,
      title
    }
  })
}
// 绑定渠道
export function setOrUpdateQDtoUser(is_del, member_account, user_account, ) {
  return request.member({
    url: '/user/setOrUpdateQDtoUser',
    method: 'get',
    params: {
      is_del,
      member_account,
      user_account,
    }
  })
}
// 获取代理和渠道列表
export function findAllAgentAndQD(userInfos) {
  return request.member({
    url: '/user/findAllAgentAndQD',
    method: 'get',
    params: userInfos
  })
}
// 通过渠道账号查询名下代理
export function findAgentByQDAccount(params) {
  return request.member({
    url: '/userCount/findAgentByQDAccount',
    method: 'get',
    params: params
  })
}
// 后台代理分组功能实现
export function setAgentToGroup(userInfos) {
  return request.member({
    url: '/userCount/setAgentToGroup',
    method: 'get',
    params: userInfos
  })
}

// 获取所有会员列表
export function findAllMember(page, account, username) {
  return request.member({
    url: '/user/findAllMember',
    method: 'get',
    params: {
      page,
      pageSize: 20,
      account,
      username

    }
  })
}
// 会员设置渠道
export function updateMemberToQD(params) {
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

// 轮播图列表
export function findAllBanner(params) {
  return request.member({
    url: '/userCount/findAllBanner',
    method: 'get',
    params: params
  })
}
// 轮播图列表 -- 添加 修改
export function addBanner(params) {
  return request.member({
    url: '/userCount/addBanner',
    method: 'get',
    params: params
  })
}
//自动加白设置
export function jiabai(params) {
  return request.member({
    url: '/userManage/updateAutoToWrite',
    method: 'get',
    params: params
  })
}
//查询加白设置
export function currentjiabai(params) {
  return request.member({
    url: '/user/isWhite',
    method: 'get',
    params: params
  })
}

// 开户轮播墙

export function findAccountWall(userInfos) {
  return request.member({
    url: '/userCount/findAccountWall',
    method: 'get',
    params: userInfos
  })
}
// 激活轮播墙

export function findAccountActiveWall(userInfos) {
  return request.member({
    url: '/userCount/findAccountActiveWall',
    method: 'get',
    // params: {
    //   loginAccount
    // }
    params: userInfos
  })
}
// 充值消费轮播墙
export function findRechargeAndConsumerWall(params) {
  return request.member({
    url: '/userCount/findRechargeAndConsumerWall',
    method: 'get',
    params: params

  })
}
// 会员返点列表
export function findAllRate(userInfos) {
  return request.member({
    url: '/userManage/findAllRate',
    method: 'get',
    params: userInfos
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
// 代理给客户加款流水记录记录
export function getSubordinateMember(params) {
  return request.member({
    url: '/userManage/getSubordinateMember',
    method: 'get',
    params: params
  })
}
//  客户批量转移
export function moveMember(oldAccount, newAccount, moveMemberId) {
  return request.member({
    url: '/userManage/moveMember',
    method: 'get',
    params: {
      oldAccount,
      newAccount,
      moveMemberId
    }
  })
}
//获取代理授信表数据
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
    url: '/userCount/findPaySwitch',
    method: 'get',
  })
}

//充值流水记录
export function findQrChargeLine(params) {
  return request.pay({
    url: '/QrCodePay/findQrChargeLine',
    method: 'post',
    params: params
  })
}
//支付修改
export function addPaySwitch(params) {
  return request.member({
    url: '/userCount/addPaySwitch',
    method: 'get',
    params: params
  })
}
//线下支付审核-列表
export function getPayApplyList(params) {
  return request.pay({
    url: '/xxPay/getPayApplyList',
    method: 'get',
    params: params
  })
}
//线下支付审核-列表 - 通过
export function passPayApply(params) {
  return request.pay({
    url: '/xxPay/passPayApply',
    method: 'get',
    params: params
  })
}
//线下支付审核-列表 - 驳回
export function refuseApply(params) {
  return request.pay({
    url: '/xxPay/refuseApply',
    method: 'get',
    params: params
  })
}
//获取线下支付列表
export function getPayChannelList(params) {
  return request.pay({
    url: '/xxPay/getPayChannelList',
    method: 'get',
    params: params
  })
}
//线下支付列表删除
export function deletePayChannel(params) {
  return request.pay({
    url: '/xxPay/deletePayChannel',
    method: 'post',
    params: params
  })
}
//线下支付状态修改
export function updateStatus(params) {
  return request.pay({
    url: '/xxPay/updateStatus',
    method: 'get',
    params: params
  })
}
//添加线下支付
export function addPay(params) {
  return request.pay({
    url: '/xxPay/add',
    method: 'post',
    params: params
  })
}
//线下支付 - 修改
export function updatePayChanne(params) {
  return request.pay({
    url: '/xxPay/updatePayChanne',
    method: 'get',
    params: params
  })
}
//添加线下支付 - 图片上传
export function uploadImage(params) {
  return request.infos({
    url: '/information/uploadImage',
    method: 'post',
    params: params
  })
}
//线下充值加款明细
export function findRechargeUnderLine(params) {
  return request.member({
    url: '/user/findRechargeUnderLine',
    method: 'get',
    params: params
  })
}
//线下充值明细 充值功能
export function xxCharge(params) {
  return request.pay({
    url: '/xxPay/xxCharge',
    method: 'get',
    params: params
  })
}
//线上充值流水 
export function findRechargeOnLine(params) {
  return request.member({
    url: 'user/findRechargeOnLine',
    method: 'get',
    params: params
  })
}
//钱包流水列表
export function findMemberWalletLineByAccount(params) {
  return request.member({
    url: '/user/findMemberWalletLineByAccount',
    method: 'get',
    params: params
  })
}
//获取钱包信息列表
export function findAllMemberWalletInfo(params) {
  return request.member({
    url: '/user/findAllMemberWalletInfo',
    method: 'get',
    params: params
  })
}
//获取钱包金额统计
export function countMemberWalletInfo(params) {
  return request.member({
    url: '/userCount/countMemberWalletInfo',
    method: 'get',
    params: params
  })
}
//获取所有充值失败的订单
export function getAllFailPayOrder(params) {
  return request.pay({
    url: '/pay/getAllFailPayOrder',
    method: 'get',
    params: params
  })
}
//充值补单
export function chargeFix(params) {
  return request.pay({
    url: '/pay/chargeFix',
    method: 'get',
    params: params
  })
}
//资金冲正
export function chargeRight(params) {
  return request.pay({
    url: '/pay/chargeRight',
    method: 'get',
    params: params
  })
}
//支付配置 -获取所有渠道/代理
export function getPayMember(params) {
  return request.pay({
    url: '/xxPay/getPayMember',
    method: 'get',
    params: params
  })
}
//支付配置 -查询单个会员
export function getPayMemberByAccount(params) {
  return request.pay({
    url: '/xxPay/getPayMemberByAccount',
    method: 'get',
    params: params
  })
}
//支付配置 -修改支付渠道
export function updateMemberPayWays(id, ids) {
  return request.pay({
    url: '/xxPay/updateMemberPayWays',
    method: 'get',
    params: {
      id,
      ids
    }
  })
}
//财务资金明细
export function findFinancialMoneyInfo(params) {
  return request.member({
    url: '/user/findFinancialMoneyInfo',
    method: 'get',
    params: params
  })
}

// 当日所有人员的销量详情
export function findSaleInfo(params) {
  return request.member({
    url: 'user/findSaleInfo',
    method: 'get',
    params: params
  })
}

//财务现金明细
export function findFinancialCashInfo(params) {
  return request.member({
    url: '/user/findFinancialCashInfo',
    method: 'get',
    params: params
  })
}
// 线下充值会员账号查询
export function getMemberWalletByAccount(params) {
  return request.pay({
    url: '/xxPay/getMemberWalletByAccount',
    method: 'get',
    params: params
  })
}
// 彩金赠送
export function presentes(username, params) {
  return request.member({
    url: '/userManage/presentes',
    method: 'get',
    params: {
      username,
      params
    }
  })
}
//线下加款统计
export function getBackAccountChargeLine(params) {
  return request.pay({
    url: '/xxPay/getBackAccountChargeLine',
    method: 'get',
    params: params
  })
}
// 提款申请列表
export function findMemberDrawingList(params) {
  return request.pay({
    url: '/pay/findMemberDrawingList',
    method: 'get',
    params: params
  })
}
// 提款申请列表 - 审核操作
export function memberDrawingReview(params) {
  return request.pay({
    url: '/pay/memberDrawingReview',
    method: 'get',
    params: params
  })
}
// 财务审核统计
export function getFinanceCount(params) {
  return request.user({
    url: '/userCount/getFinanceCount',
    method: 'get',
    params: params
  })
}
// 中奖金额总和
export function getPlanWiningPrize(params) {
  return request.user({
    url: '/userCount/getPlanWiningPrize',
    method: 'get',
    params: params
  })
}
// 运营管理==============
//  寻票列表====暂存
export function findTicketList(params) {
  return request.ticket({
    url: '/ticket/findTicketList',
    method: 'get',
    params: params
  })
}
//  寻票列表
export function findTicketList2(params) {
  return request.ticket({
    url: '/ticket/findTicketList2',
    method: 'get',
    params: params
  })
}
//  抄单
export function copyPlan(params) {
  return request.lottery({
    url: '/lottery/copyPlan',
    method: 'get',
    params: params
  })
}
//  运营寻票操作
export function findTicke2(params) {
  return request.ticket({
    url: '/ticket/findTicke2',
    method: 'get',
    params: params
  })
}
//  发起送票
export function deliverTicket(params) {
  return request.ticket({
    url: '/ticket/deliverTicket',
    method: 'get',
    params: params
  })
}
//  出票检验参数
export function getTicketConfig(params) {
  return request.ticket({
    url: '/ticket/getTicketConfig',
    method: 'get',
    params: params
  })
}
//  出票检验参数 - 修改校验参数
export function updateTicketConfig(params) {
  return request.ticket({
    url: '/ticket/updateTicketConfig',
    method: 'get',
    params: params
  })
}
//  获取直接出票会员
export function getMemberTicket(params) {
  return request.lottery({
    url: '/lottery/getMemberTicket',
    method: 'get',
    params: params
  })
}
//  设置直接出票会员
export function setMemberTicket(params) {
  return request.lottery({
    url: '/lottery/setMemberTicket',
    method: 'get',
    params: params
  })
}
//  自动跟单
export function autoCopyPlan(params) {
  return request.lottery({
    url: '/lottery/autoCopyPlan',
    method: 'get',
    params: params
  })
}
//  机器人列表
export function getRobotList(params) {
  return request.member({
    url: '/userManage/getRobotList',
    method: 'get',
    params: params
  })
}
//  添加机器人
export function addRobot(params) {
  return request.member({
    url: '/userManage/addRobot',
    method: 'get',
    params: params
  })
}
//  彩研列表
export function getMember(params) {
  return request.member({
    url: '/user/getMember',
    method: 'get',
    params: params
  })
}
//  彩研-设置
export function toCaiYan(params) {
  return request.member({
    url: '/user/toCaiYan',
    method: 'get',
    params: params
  })
}
//  组合限售列表
export function getLotteryLimit(params) {
  return request.lottery({
    url: '/lottery/getLotteryLimit',
    method: 'get',
    params: params
  })
}
//  组合限售-添加
export function addLotteryLimit(params) {
  return request.lottery({
    url: '/lottery/addLotteryLimit',
    method: 'get',
    params: params
  })
}
//  组合限售-修改限售状态
export function updateLotteryLimitStatus(params) {
  return request.lottery({
    url: '/lottery/updateLotteryLimitStatus',
    method: 'get',
    params: params
  })
}

// 渠道销量统计
export function findQdSaleCount(userinfos) {
  return request.member({
    url: '/userCount/findQdSaleCount',
    method: 'get',
    params: userinfos
  })
}
