import request from '@/utils/request'
//获取票务数据
export function searchTicket(userinfos) {
    return request.ticket({
      url: '/ticket/searchTicket',
      method: 'get',
      params:userinfos
    })
  }