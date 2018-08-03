import request from '@/utils/request'
import user from '../store/modules/user';

//竞彩日报
//每日两单一
export function createDayOneDan1(dayOneDan2DTO) {
  return request.infos({
    url: 'http://192.168.41.61:8081/information/createDayOneDan1',
    method: 'post',
    params:{dayOneDan2DTO}
  })
}
//每日两单二
export function createDayOneDan2(userinfos) {
  return request.infos({
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