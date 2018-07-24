import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function findAgentInfoByAccount(model) {
  return request({
    url:'/user/findAgentInfoByAccount',
    method:'get',
    params:model
  })
}
