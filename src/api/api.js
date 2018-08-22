

// 获取是开发环境还是生产环境
const baseUrl = process.env.NODE_ENV;
// console.log(baseUrl)
let QY;
// 开发模式
function Api(baseUrl) {
    if (baseUrl == "development") {
        console.log("开发环境")
        // 开发环境
        QY = {
            // member: "http://member.api.qiyun88.cn",
            member: "http://192.168.42.71:8010",

            infos: "http://infos.api.qiyun88.cn",
            pay: "http://pay.api.qiyun88.cn",
            ticket: "http://ticket.api.qiyun88.cn",
            lottery: "http://lottery.api.qiyun88.cn",
        }

    } else {
        console.log("生产环境")
        QY = {
            member: "https://member.api.qyun88.com",
            infos: "https://infos.api.qyun88.com",
            pay: "https://pay.api.qyun88.com",
            ticket: "https://ticket.api.qyun88.com",
            lottery: "https://lottery.api.qyun88.com",
        }

    }
}
Api(baseUrl)
export default QY;
// http://192.168.0.188:8081/