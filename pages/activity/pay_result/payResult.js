// pages/shop/pay_result/payResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: 0,
    qr:"",
    key:"",
    status:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var jsonData = options.jsonData
    jsonData = JSON.parse(jsonData)
    console.log(jsonData)
    this.setData({
      order_id: jsonData.order_id,
      qr: jsonData.qr,
      key:jsonData.key,
      status: jsonData.status
    })
  },
  goToOrderDetail() {
    wx.navigateTo({
      url: '/pages/activity/order_detail/orderDetail?id=' + this.data.order_id,
    })
  },
  copyOrderNo: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
})