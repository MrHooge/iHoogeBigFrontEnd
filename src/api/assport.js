import request from "@/utils/request";
/**
 * 时讯体育
 */
var url;
// 获取是开发环境还是生产环境
const baseUrl = process.env.NODE_ENV;
console.log(process.env)
if (baseUrl === 'development') {
    // url = "https://master.api.qiyun88.cn"
    url = "http://192.168.1.37:10130"
} else {
    url = "https://app.api.99zxds.com"
}
// 优惠券统计
export function newCardList(params) {
    return request.member({
        url: url + '/memberManage/newCardList',
        method: 'get',
        params: params
    })
}

// 等级抽佣列表
export function getCommissionList(params) {
    return request.member({
        url: url + '/memberManage/getCommissionList',
        method: 'get',
        params: params
    })
}
// 修改等级抽佣
export function updateCommission(params) {
    return request.member({
        url: url + '/memberManage/updateCommission',
        method: 'get',
        params: params
    })
}
// 修改等级
export function updateLevel(params) {
    return request.member({
        url: url + '/memberManage/updateLevel',
        method: 'get',
        params: params
    })
}