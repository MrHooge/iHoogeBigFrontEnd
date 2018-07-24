import request from '@/utils/request'

//修改密码
export function resetPassword(account,password){
    return request.member({
        url:'/user/resetPassword',
        method:'get',
        params:{
            account,
            password
        }
    })
}
//会员统计
export function findAllMember(userinfos){
    return request.member({
        url:'/user/findAllMember',
        method:'get',
        params:userinfos
    })
}
//会员管理
