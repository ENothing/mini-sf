// pages/shop/order/order.js
import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_spu: null,
    coupons:"",
    default_address:"",
    coupon_price:0,
    real_price:0,
    checked:0
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

      var coupon_price = 0
      var real_price = 0


      if(data.coupons.length != 0){
        switch (data.coupons[0].coupon_type){
          case 1:
            coupon_price = data.coupons[0].reduction_price
            break;
          case 2:  
            coupon_price = data.coupons[0].immediately_price
            break;
          case 3:
            coupon_price = (this.goods_spu.price * (1-  data.coupons[0].discount)).toFixed(2)
            break;
        }
      }

      console.log(data.goods_spu.price)
      console.log(coupon_price)

      real_price = data.goods_spu.price + data.goods_spu.post_price - coupon_price

      this.setData({
        goods_spu: data.goods_spu,
        default_address:data.default_address,
        coupons: data.coupons,
        coupon_price: coupon_price,
        real_price: real_price
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
  chooseCoupon(e){
    var index = e.currentTarget.dataset.index
    var coupon_price = 0
    var real_price = 0

    switch (this.data.coupons[index].coupon_type) {
      case 1:
        coupon_price = this.data.coupons[index].reduction_price
        break;
      case 2:
        coupon_price = this.data.coupons[index].immediately_price
        break;
      case 3:
        coupon_price = (this.goods_spu.price * (1 - this.data.coupons[index].discount)).toFixed(2)
        break;
    }

    real_price = this.data.goods_spu.price + this.data.goods_spu.post_price - coupon_price

    this.setData({
      checked:index,
      real_price: real_price,
      coupon_price: coupon_price,
      modalName: null
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