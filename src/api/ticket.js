import request from '@/utils/request'
//获取票务数据
export function searchTicket(userinfos) {
    return request.ticket({
      url: '/ticket/searchTicket',
      method: 'get',
      params:userinfos
    })
  }

//获取打票数据
export function ticketPrintSearch(userInfos) {
    var params =new URLSearchParams();
    params.append('value',JSON.stringify(userInfos));
    return request.ticket({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
      url: '/ticketSystem/ticketPrintSearch',
      method: 'post',
      data:JSON.stringify(userInfos)
    })
  }

  //优先推送
  export function firstPush(userinfos) {
    return request.ticket({
      url: '/ticketSystem/firstPush',
      method: 'get',
      params:userinfos
    })
  }

//修改票状态
export function updateTicketStatus(userinfos) {
    return request.ticket({
        url: '/ticketSystem/updateTicketStatus',
        method: 'get',
        params: userinfos
    })
}
//修改拆包票数
export function updateChaiPiaoCount(userinfos) {
    return request.ticket({
        url: '/ticketSystem/updateChaiPiaoCount',
        method: 'get',
        params: userinfos
    })
}

//获取单个拆包票数
export function getChaiPiaoCount(userinfos) {
    return request.ticket({
        url: '/ticketSystem/getChaiPiaoCount',
        method: 'get',
        params: userinfos
    })
}
//获取打票详情数据
export function ticketPrintDetail(userinfos) {
    return request.ticket({
      url: '/ticketSystem/ticketPrintDetail',
      method: 'get',
      params: userinfos
    })
  }
