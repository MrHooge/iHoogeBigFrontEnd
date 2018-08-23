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
//查询中奖方案
export function getWinPlanByType(lotteryTypes){
    return request.lottery({
        url:'/lottery/getWinPlanByType',
        method:'get',
        params:{
            lotteryTypes
        }
    })
}
//竞彩篮球
export function getBasketBallAdmin(time){
    return request.lottery({
        url:'/lottery/getBasketBallAdmin',
        method:'get',
        params:{
            time
        }
    })
}
//竞彩足球
export function getFootBallAdmin(time){
    return request.lottery({
        url:'/lottery/getFootBallAdmin',
        method:'get',
        params:{
            time
        }
    })
}
//竞彩足球修改
export function updateFootBallAdmin(userinfos){
    return request.lottery({
        url:'/lottery/updateFootBallAdmin',
        method:'get',
        params:userinfos
        
    })
}
//方案查询
export function selectLotteryPlan(userinfos){
    return request.lottery({
        url:'/lottery/selectLotteryPlan',
        method:'get',
        params:userinfos
        
    })
}
//方案修改
export function updatePlanDesc(desc,planNo){
    return request.lottery({
        url:'/lottery/updatePlanDesc',
        method:'get',
        params:{
            desc,
            planNo
        }
        
    })
}
//彩种列表
export function getLotteryTypeIsSale(){
    return request.lottery({
        url:'/lottery/getLotteryTypeIsSale',
        method:'get'     
    })
}
//修改彩种列表
export function updateLotteryTypeIsSale(lotteryType,status){
    return request.lottery({
        url:'/lottery/updateLotteryTypeIsSale',
        method:'get',
        params:{
            lotteryType,
            status
        }  
    })
}
//退单
export function planBack(userinfos){
    return request.lottery({
        url:'/lottery/planBack',
        method:'get',
        params:userinfos
    })
}
//是否焦点赛事方案
export function getIsFocusPlan(userinfos){
    return request.lottery({
        url:'/lottery/getIsFocusPlan',
        method:'get',
        params:userinfos
    })
}