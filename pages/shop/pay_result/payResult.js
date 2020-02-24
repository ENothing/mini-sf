// pages/shop/pay_result/payResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.order_id
    this.setData({
      order_id:order_id
    })
    console.log('pay_order_id:'+order_id)
  },
  goToOrderDetail(){
    wx.navigateTo({
      url: '/pages/shop/order_detail/orderDetail?id='+this.data.order_id,

    })
  }
})