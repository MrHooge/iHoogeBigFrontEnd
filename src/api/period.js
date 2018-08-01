import request from '@/utils/request'

export function findTerm(userinfos){
    return request.lottery({
        url:'/lottery/findTerm',
        method:'get',
        params:userinfos
    })
}
//编辑
export function updateTerm(userinfos){
    return request.lottery({
        url:'/lottery/updateTerm',
        method:'get',
        params:userinfos
    })
}
//开奖
export function openResult(lotteryTypes){
    return request.lottery({
        url:'/lottery/openResult',
        method:'get',
        params:{
            lotteryTypes
        }
    })
}
//派奖
export function returnPrize(plans){
    return request.lottery({
        url:'/lottery/returnPrize',
        method:'get',
        params:{
            plans
        }
    })
}   