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