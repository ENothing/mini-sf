// pages/shop/order/order.js
import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_spu: null,
    coupons:"",
    default_address:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    console.log(id)

    var token = wx.getStorageSync('token')
    console.log(token)

    api.preOrderDetail(id, token).then(data => {
      console.log(data)
      this.setData({
        goods_spu: data.goods_spu,
        default_address:data.default_address,
        coupons: data.coupons
      })

    })






    this.setData({
      id: id
    })
  },
  goToSubmit(e) {
    wx.navigateTo({
      url: '/pages/shop/pay_result/payResult',
    })
  },




  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

})