import request from "@/utils/request";

/**
 * 个人审核相关
 */

// 接口名称 1.待审核个性签名列表
let url = "http://180.97.82.13:10130";
export function getReviewList(obj) {
  return request.member({
    url: url + "/memberManage/autographList",
    method: "get",
    params: obj
  });
}

// 接口名称 2.个性签名审核
export function Reviews(obj) {
  return request.member({
    url: url + "/memberManage/autographExamine",
    method: "get",
    params: obj
  });
}

/**
 * 修改信息相关
 */
export function addLabel(obj) {
  return request.member({
    url: url + "/memberManage/addLabel",
    method: "get",
    params: obj
  });
}

/**
 * 手动匹配篮球赛事模块的接口
 */

//  根据时间搜索500万篮球赛事
export function seachFiveBaketball(obj) {
  return request.member({
    url: url + "/master/searchBasketballGameFive",
    method: "get",
    params: obj
  });
}

//   根据时间搜索飞鲸篮球赛事
export function seachFjBaketball(obj) {
  return request.member({
    url: url + "/master/searchBasketballGameFj",
    method: "get",
    params: obj
  });
}

//  模糊搜索飞鲸篮球球队信息
export function FuzzySeach(obj) {
  return request.member({
    url: url + "/master/searchBasketballTeamFj",
    method: "get",
    params: obj
  });
}

//   接口名称 匹配篮球球队
//   请求类型 get
//   请求Url  /master/matchBasketballTeam

export function matchBasketballTeam(obj) {
  return request.member({
    url: url + "/master/matchBasketballTeam",
    method: "get",
    params: obj
  });
}

// 接口名称 匹配篮球赛事
// 请求类型 get
// 请求Url  /master/matchBasketballGame

export function matchBasketballGame(obj) {
  return request.member({
    url: url + "/master/matchBasketballGame",
    method: "get",
    params: obj
  });
}

// 接口名称 添加大师
// 请求类型 get
// 请求Url  /memberManage/addMaster

export function addMantio(obj) {
  return request.member({
    url: url + "/memberManage/addMaster",
    method: "get",
    params: obj
  });
}
//添加云豆
export function addCloud(obj) {
  return request.member({
    url: url + "/memberManage/addCloud",
    method: "get",
    params: obj
  });
}
//获取评论列表
export function getCommentList(obj) {
  return request.member({
    url: url + "/memberManage/getCommentList",
    method: "get",
    params: obj
  });
}
//评论回复驳回
export function bhComment(obj) {
  return request.member({
    url: url + "/memberManage/bhComment",
    method: "get",
    params: obj
  });
}
//线下充值
export function addClouds(obj) {
  return request.member({
    url: url + "/memberManage/addClouds",
    method: "get",
    params: obj
  });
}
//获取提现列表
export function withdrawCashList(obj) {
  return request.member({
    url: url + "/memberManage/withdrawCashList",
    method: "get",
    params: obj
  });
}
//提现确认
export function withdrawCashConfirm(obj) {
  return request.member({
    url: url + "/memberManage/withdrawCashConfirm",
    method: "get",
    params: obj
  });
}
//提现驳回
export function withdrawCashReject(obj) {
  return request.member({
    url: url + "/memberManage/withdrawCashReject",
    method: "get",
    params: obj
  });
}
//获取举报列表
export function getReportList(obj) {
  return request.member({
    url: url + "/memberManage/getReportList",
    method: "get",
    params: obj
  });
}
//举报审核
export function shReport(obj) {
  return request.member({
    url: url + "/memberManage/shReport",
    method: "get",
    params: obj
  });
}
//获取反馈列表
export function getFeedbackList(obj) {
  return request.member({
    url: url + "/memberManage/getFeedbackList",
    method: "get",
    params: obj
  });
}

//查询充值明细列表
export function getRechargeList(obj) {
  return request.member({
    url: url + "/memberManage/getRechargeList",
    method: "get",
    params: obj
  });
}
//查询提款明细列表
export function getWithdrawList(obj) {
  return request.member({
    url: url + "/memberManage/getWithdrawList",
    method: "get",
    params: obj
  });
}
//查询购买推荐明细列表
export function getBuyRecommendList(obj) {
  return request.member({
    url: url + "/memberManage/getBuyRecommendList",
    method: "get",
    params: obj
  });
}
//查询不中退款明细列表
export function getRecommendRefundList(obj) {
  return request.member({
    url: url + "/memberManage/getRecommendRefundList",
    method: "get",
    params: obj
  });
}
//查询被购加款明细列表
export function getRecommendIncomeLis(obj) {
  return request.member({
    url: url + "/memberManage/getRecommendIncomeLis",
    method: "get",
    params: obj
  });
}
//查询快速审核扣款明细
export function getQuickReviwList(obj) {
  return request.member({
    url: url + "/memberManage/getQuickReviwList",
    method: "get",
    params: obj
  });
}
//查询云朵汇总表
export function getCloundSummaryList(obj) {
  return request.member({
    url: url + "/memberManage/getCloundSummaryList",
    method: "get",
    params: obj
  });
}
//获取购买围观列表
export function getOnLookList(obj) {
  return request.member({
    url: url + "/memberManage/getOnLookList",
    method: "get",
    params: obj
  });
}