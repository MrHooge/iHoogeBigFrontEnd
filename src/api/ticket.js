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

  export function addRoleBondPermission(userInfos) {
    var params =new URLSearchParams();
    params.append('value',JSON.stringify(userInfos));
    return request.member({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
      url: '/user/addRoleBondPermission',
      method: 'post',
      data:JSON.stringify(userInfos)
    })
  }