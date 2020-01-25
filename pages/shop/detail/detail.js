// pages/shop/detail/detail.js
import api from '../../../utils/api.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: null,
    modalButton: null,
    choose_key: null,
    choose_name: null,
    id:"",
    shop_goods_detail:"",
    purchasers:"",
    p_total:0
  },
  onLoad(options) {

    var id = options.id
    this.setData({
      id: id
    })

    api.shopGoodsDetail(id).then(data => {
      this.setData({
        shop_goods_detail: data.shop_goods_detail,
        shop_goods_spus: data.shop_goods_spus,
        purchasers: data.purchasers,
        p_total: data.p_total,
      })

    })


    wx.hideLoading()
  },



  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      modalButton: null
    })
  },
  showButtonModal(e) {
    var id = e.currentTarget.dataset.id

    if (this.data.choose_key == id) {
      this.setData({
        modalButton: null,
        choose_key: null,
        choose_name: null,
      })
    }else{
      this.setData({
        modalButton: e.currentTarget.dataset.target,
        choose_key: id,
        choose_name: e.currentTarget.dataset.name,
      })
    }

  },

  goToOrder(e){
      wx.navigateTo({
          url: '/pages/shop/order/order?id=' + this.data.choose_key,
      })
  },





})