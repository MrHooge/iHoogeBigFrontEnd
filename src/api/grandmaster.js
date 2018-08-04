import request from '@/utils/request'

//获取充值明细列表
export function getRechargeList(userinfos) {
  return request.infos({
    url: '/master/getRechargeList',
    method: 'get',
    params: userinfos
  })
}
//查询提款明细列表
export function getWithdrawList(userinfos) {
    return request.infos({
      url: '/master/getWithdrawList',
      method: 'get',
      params: userinfos
    })
  }
  //查询购买推荐明细列表
  export function getBuyRecommendList(userinfos) {
    return request.infos({
      url: '/master/getBuyRecommendList',
      method: 'get',
      params: userinfos
    })
  }
  //查询不中退款明细列表
  export function getRecommendRefundList(userinfos) {
    return request.infos({
      url: '/master/getRecommendRefundList',
      method: 'get',
      params: userinfos
    })
  }
  //查询打赏明细
  export function getRewardList(userinfos) {
    return request.infos({
      url: '/master/getRewardList',
      method: 'get',
      params: userinfos
    })
  }
  //查询被购加款明细列表
  export function getRecommendIncomeList(userinfos) {
    return request.infos({
      url: '/master/getRecommendIncomeList',
      method: 'get',
      params: userinfos
    })
  }
  //查询打赏收入明细
  export function getRewardIncomeList(userinfos) {
    return request.infos({
      url: '/master/getRewardIncomeList',
      method: 'get',
      params: userinfos
    })
  }
  //查询云朵汇总表
  export function getCloundSummaryList(userinfos) {
    return request.infos({
      url: '/master/getCloundSummaryList',
      method: 'get',
      params: userinfos
    })
  }
  //获取认证名人列表
  export function getHighGradeList(userinfos) {
    return request.infos({
      url: '/master/getHighGradeList',
      method: 'get',
      params: userinfos
    })
  }
  //添加实战大神
  export function addHighGrade(userinfos) {
    return request.infos({
      url: '/master/addHighGrade',
      method: 'get',
      params: userinfos
    })
  }
  //取消实战大神
  export function cancelHighGrade(userinfos) {
    return request.infos({
      url: '/master/cancelHighGrade',
      method: 'get',
      params: userinfos
    })
  }
  //修改排序权重
export function changeSort(userinfos) {
    return request.infos({
      url: '/master/changeSort',
      method: 'get',
      params: userinfos
    })
  }
  //获取认证名人列表
  export function getMasterList(userinfos) {
    return request.infos({
      url: '/master/getMasterList',
      method: 'get',
      params: userinfos
    })
  }
  //添加认证名人
  export function addMaster(userinfos) {
    return request.infos({
      url: '/master/addMaster',
      method: 'get',
      params: userinfos
    })
  }
  //取消认证名人
  export function cancelMaster(userinfos) {
    return request.infos({
      url: '/master/cancelMaster',
      method: 'get',
      params: userinfos
    })
  }
   //待审核推荐列表
   export function examineList(userinfos) {
    return request.infos({
      url: '/master/examineList',
      method: 'get',
      params: userinfos
    })
  }
   //审核
   export function examine(userinfos) {
    return request.infos({
      url: '/master/examine',
      method: 'get',
      params: userinfos
    })
  }
   //提现列表
   export function withdrawCashList(userinfos) {
    return request.infos({
      url: '/master/withdrawCashList',
      method: 'get',
      params: userinfos
    })
  }
//提现
export function withdrawCashConfirm(account) {
  return request.infos({
    url: '/master/withdrawCashConfirm',
    method: 'get',
    params: {
      account
    }
  })
}