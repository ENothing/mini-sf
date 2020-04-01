// pages/shop/order/order.js
import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_spu_id: 0,
    goods_spu: null,
    coupons: "",
    address: "",
    coupon_price: 0,
    real_price: 0,
    checked: 0,
    address_id: 0,
    coupon_id: 0,
    goods_id: 0,
    token:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var address_id = options.address_id

    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })

    api.preOrderDetail(id, token).then(data => {

      var coupon_price = 0
      var real_price = 0


      if (data.coupons.length != 0) {
        switch (data.coupons[0].coupon_type) {
          case 1:
            coupon_price = data.coupons[0].reduction_price
            break;
          case 2:
            coupon_price = data.coupons[0].immediately_price
            break;
          case 3:
            coupon_price = (this.goods_spu.price * (1 - data.coupons[0].discount)).toFixed(2)
            break;
        }

        this.setData({
          coupon_id: data.coupons[0].coupon_id
        })
      }


      real_price = data.goods_spu.price + data.goods_spu.post_price - coupon_price

      this.setData({
        goods_spu: data.goods_spu,
        coupons: data.coupons,
        coupon_price: coupon_price,
        real_price: real_price,
        goods_id: data.goods_spu.goods_id,
        goods_spu_id: id
      })

    })


    api.detailToOrder({ token: token, id: address_id }).then(data => {
      console.log(data)
      this.setData({
        address: data,
        address_id: data.id
      })
    })

  },
  goToSubmit(e) {
    console.log(this.data.address_id)
    if(this.data.address_id == 0){
      wx.showToast({
        icon: "none",
        title: "还没有选择地址哦~",
      })
      return;
    }

    api.shopBuy({
      token: this.data.token,
      num: 1,
      goodsSpuId: this.data.goods_spu_id,
      addressId: this.data.address_id,
      goodsId: this.data.goods_id,
      couponId: this.data.coupon_id
    }
    ).then(data => {
      wx.navigateTo({
        url: '/pages/shop/pay_result/payResult?order_id=' + data,
      })
    })

  },
  chooseCoupon(e) {
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
      checked: index,
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
  goToChooseAddress(e) {
    wx.navigateTo({
      url: '/pages/personal/address/address?status=1&goods_spu_id=' + this.data.goods_spu_id,
    })
  }

})