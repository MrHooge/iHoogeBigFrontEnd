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
        params:{
            params
        }
    })
}
//红包记录
export function grabRedRacketList2(params){
    return request.pay({
        url:'/redPacket/grabRedRacketList2',
        method:'get',
        params:params
    })
}
export function putRedRacketList2(params){
    return request.pay({
        url:'/redPacket/putRedRacketList2',
        method:'get',
        params:params
    })
}
//发布平台红包
export function addRedRacketForPlatform(params){
    return request.pay({
        url:'/redPacket/addRedRacketForPlatform',
        method:'get',
        params:params
    })
}