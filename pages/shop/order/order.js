// pages/shop/order/order.js
import api from '../../../utils/api.js'

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


    api.preOrderDetail(id).then(data => {
      console.log(data)
      // this.setData({
      //   shop_goods_detail: data.shop_goods_detail,
      //   shop_goods_spus: data.shop_goods_spus,
      //   purchasers: data.purchasers,
      //   p_total: data.p_total,
      // })

    })






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