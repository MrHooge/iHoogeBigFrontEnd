import request from '@/utils/request'

export function findMemberWalletLineByAccount(userinfos){
    return request.member({
        url:'/user/findMemberWalletLineByAccount',
        method:'get',
        params:userinfos
    })
}