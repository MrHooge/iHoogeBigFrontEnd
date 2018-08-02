const ticket = {
    state:{
        obj:{},
        type:''
    },
    mutations:{
        SET_TYPE:(state,type) => {
            state.type = type
        }
    },
    actions:{
        //提交
        Sendtime({commit},typelist){
            const type = typelist
            return new Promise((resolve, reject) => {
                // commit('SET_TOKEN', res.data.account)
                commit('SET_TYPE',playtype)
            })
        }
    }
}