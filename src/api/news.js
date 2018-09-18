import request from '@/utils/request'
import user from '../store/modules/user';

//竞彩日报
//每日两单一
export function createDayOneDan1(userinfos) {
  return request.infos({
    url: '/information/createDayOneDan1',
    method: 'post',
    data:userinfos
  })
}
//每日两单二
export function createDayOneDan2(userinfos) {
  return request.infos({
    url: '/information/createDayOneDan2',
    method: 'post',
    data:userinfos
  })
}
//实战二串一（一）
export function createSZ2C11(userinfos) {
  return request.infos({
    headers:{"Content-Type":"application/json"},
    url: '/information/createSZ2C11',
    method: 'post',
    data:userinfos
  })
}
//实战二串一（二）
export function createSZ2C12(userinfos) {
  return request.infos({
    headers:{"Content-Type":"application/json"},
    url: '/information/createSZ2C12',
    method: 'post',
    data:userinfos
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
//根据id获取资讯
export function getNew(userinfos) {
  return request.infos({
    url: '/information/getNew',
    method: 'get',
    params: userinfos
  })
}
//发布新闻
export function createNews(userinfos) {
  return request.infos({
    url: '/information/createNews',
    method: 'post',
    data: userinfos
  })
}
//修改新闻
export function reviseNews(userinfos) {
    return request.infos({
      url: '/information/reviseNews',
      method: 'post',
      data: userinfos
    })
  }
//获取类别或标签列表
export function getTypes(userinfos) {
  return request.infos({
    url: '/information/getTypes',
    method: 'get',
    params:userinfos
  })
}
//上传图片
export function uploadImage(userinfos) {
  return request.infos({
    url: '/information/uploadImage',
    method: 'post',
    params:userinfos
  })
}
//上传图片
export function setNewsPicetur(userinfos) {
  return request.infos({
    url: '/information/setNewsPicetur',
    method: 'post',
    params:userinfos
  })
}
//添加站内信
export function addMail(maill) {
  return request.infos({
    url: '/information/addMail',
    method: 'post',
    params:maill
  })
}
//获取站内信列表数据
export function getMailList(userinfos) {
  return request.infos({
    url: '/information/getMailList',
    method: 'get',
    params:userinfos
  })
}

//评论列表
export function getUnreviewedCommentList(params) {
    return request.infos({
      url: '/information/getUnreviewedCommentList',
      method: 'get',
      params:params
    })
  }
  //评论审核
export function shComment(type,cid) {
    return request.infos({
      url: '/information/shComment',
      method: 'get',
      params: {
          type,
          cid
      }
    })
  }

  //中奖评论列表
export function getUnreviewedWinCommentList(params) {
    return request.infos({
      url: '/information/getUnreviewedWinCommentList',
      method: 'get',
      params:params
    })
  }
  //中奖评论审核
export function shWinComment(type,cid) {
    return request.infos({
      url: '/information/shWinComment',
      method: 'get',
      params: {
          type,
          cid
      }
    })
  }

