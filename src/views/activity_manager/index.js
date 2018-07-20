export default  function Timestamp(stamp){
    // 判断是不是13位的时间戳格式
    if(stamp.length < 13){
        stamp = stamp*1000
    }else{
        stamp = stamp
    }
    let date = new Date(Number(stamp))
    // 获取年
    let year = date.getFullYear()

    // 获取月(月份为单位数前边补0)
    let month = date.getMonth()+1 > 9 ? date.getMonth()+1 : '0' + (date.getMonth()+1)

    // 获取日
    let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()

    // 获取时

    let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    // 获取分

    let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    // 获取秒

    let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()

    return year +'-'+ month +'-'+ day +' '+ hour +':'+ minute +':'+ second
}