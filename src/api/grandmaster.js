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