// pages/shop/order/order.js
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
    var id = options.id
    console.log(id)
    this.setData({
      id: id
    })
  },
  goToSubmit(e){
    wx.navigateTo({
      url: '/pages/shop/pay_result/payResult',
    })
  }

})