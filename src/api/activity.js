import request from '@/utils/request'

export function getActivityData(){
    return request.member({
        url:'/userManage/findAllActivity',
        method:'get',
    })
}
//添加活动
export function addActivity(userInfos){
    return request.member({
        url:'/userManage/addActivity',
        method:'get',
        params:userInfos
    })
}
//保存彩金卡
export function addGoldCard(params){
    return request.member({
        url:'/userManage/addGoldCard',
        method:'get',
        params:params
    })
}