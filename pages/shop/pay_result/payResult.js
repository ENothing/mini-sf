// pages/shop/pay_result/payResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goToOrderDetail(){
    wx.navigateTo({
      url: '/pages/shop/order_detail/orderDetail',

    })
  }
})