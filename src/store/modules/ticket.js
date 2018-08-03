import { searchTicket } from '@/api/ticket'
const ticket = {
    state:{
            provider:'',
            term:'',
            id:'',
            planNo:'',
            playType:'',
            isBingo:'',
            status:'',
            createDateTimeStart:'',
            createDateTimeEnd:'',
            printDateTimeStart:'',
            printDateTimeEnd:'',
            sendTicketDateTimeStart:'',
            sendTicketDateTimeEnd:'',
            startTerm:'',
            endTerm:'',
    },
    mutations:{
        SET_PROVIDER: (state,provider) => {
            state.provider = provider
        },
        SET_TERM: (state,term) => {
            state.term = term
        },
        SET_ID: (state,id) => {
            state.id = id
        },
        SET_PLANNO: (state,planNo) => {
            state.planNo = planNo
        },
        SET_ISBINGO: (state,isBingo) => {
            state.isBingo = isBingo
        },
        SET_STATUS: (state,status) => {
            state.status = status
        },
        SET_CREATEDATETIMESTART: (state,createDateTimeStart) => {
            state.createDateTimeStart = createDateTimeStart
        },
        SET_CREATEDATETIMEEND: (state,createDateTimeEnd) => {
            state.createDateTimeEnd = createDateTimeEnd
        },
        SET_PRINTDATETIMESTART: (state,printDateTimeStart) => {
            state.printDateTimeStart = printDateTimeStart
        },
        SET_PRINTDATETIMEEND: (state,printDateTimeEnd) => {
            state.printDateTimeEnd = printDateTimeEnd
        },
        SET_SENDTICKETDATETIMESTART: (state,sendTicketDateTimeStart) => {
            state.sendTicketDateTimeStart = sendTicketDateTimeStart
        },
        SET_SENDTICKETDATETIMEEND: (state,sendTicketDateTimeEnd) => {
            state.sendTicketDateTimeEnd = sendTicketDateTimeEnd
        },
        SET_ENDTERM: (state,endTerm) => {
            state.endTerm = endTerm
        },
        SET_STARTTERM: (state,startTerm) => {
            state.startTerm = startTerm
        },
    },
    actions:{
        //提交
        Sendtime({commit},obj){
            //const playType = sendtype
            console.log(obj);
            return new Promise((resolve, reject) => {
                searchTicket(obj).then(response => {    
                const res = response.data    
                console.log(res)       
                commit('SET_PROVIDER',res.message);
                commit('SET_TERM',res.term);
                resolve()
            })
            })
        }
    }
}
export default ticket