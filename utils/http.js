/**
 * 封装http 请求方法
 */
const apiUrl = "https://api.ericnothing.cn/app/v1"; //服务器api地址
// const apiUrl = "http://127.0.0.1:8081/app/v1"; //服务器api地址
const http = (params) => {
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl + params.url,//服务器url+参数中携带的接口具体地址
      data: params.data,//请求参数
      header: params.header || {
        "Content-Type": "application/x-www-form-urlencoded"//设置后端需要的常用的格式就好，特殊情况调用的时候单独设置
      },
      method: params.method || 'POST',//默认为GET,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      dataType: params.dataType,//返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType,//响应的数据类型
      success: function (res) {
        //接口访问正常返回数据
        if (res.statusCode == 200) {
          //1. 操作成功返回数据,原则上只针对服务器端返回成功的状态（如本例中为000000）
          if (res.data.code == 0) {
            resolve(res.data.data)
          } else if (res.data.code == "10305") {//支付结果未知 

            wx.showToast({
              icon: "none",
              title: res.data.message,
              success:function(){
                wx.navigateTo({
                  url: '/pages/personal/login/login',
                })
              }
            })
          
          }else if (params.url == "/order/result" && res.data.retCode == "800020") {//支付结果未知      
            //需要特殊处理的接口，可以单独列出来返回数据
            resolve(res.data)
          } else {
            wx.showToast({
              icon: "none",
              title: res.data.message
            })
            return
            console.log(res.data)
          }
        } else {
          //2. 操作不成功返回数据，以toast方式弹出响应信息，如后端未格式化非操作成功异常信息，则可以统一定义异常提示
          var errMsg = res.data.message
          wx.showToast({
            icon: "none",
            title: res.data.message,
            success:function(){
              wx.navigateTo({
                url: 'pages/index/index?pageCur=personal',
              })
            }
          })
          console.log(res.data)
        }
      },
      fail: function (e) {
        wx.showToast({
          icon: "none",
          title: "网络错误，请重试"
        })
        return
      }
    })
  })
}
module.exports = {
  http: http,
  apiUrl: apiUrl
}