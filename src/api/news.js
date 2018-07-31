import request from '@/utils/request'

//竞彩日报
//每日两单一
export function createDayOneDan1(params) {
  return request.infos({
    url: '/information/createDayOneDan1',
    method: 'post',
    params:params
  })
}
//每日两单二
export function createDayOneDan2(userinfos) {
  return request.infos({
    headers:{"Content-Type":"application/json"},
    url: '/information/createDayOneDan2',
    method: 'post',
    params:userinfos
  })
}
//实战二串一（一）
export function createSZ2C11(userinfos) {
  return request.infos({
    headers:{"Content-Type":"application/json"},
    url: '/information/createSZ2C11',
    method: 'post',
    params:userinfos
  })
}
//实战二串一（二）
export function createSZ2C12(userinfos) {
  return request.infos({
    headers:{"Content-Type":"application/json"},
    url: '/information/createSZ2C12',
    method: 'post',
    params:userinfos
  })
}
//获取新闻资讯
export function getNewsList(userinfos) {
  return request.infos({
    url: '/information/getNewsList',
    method: 'get',
    params:userinfos
  })
}
//发布或修改资讯
export function createNews(userinfos) {
  return request.infos({
    url: '/information/createNews',
    method: 'post',
    params:userinfos
  })
}