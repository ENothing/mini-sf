// pages/shop/order_detail/orderDetail.js
import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:"",
    refund_order:"",
    order_id:0,
    token:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    var id = options.id
    this.setData({
      order_id: id,
      token: token
    })
  },
  onShow:function(options){
    var id = this.data.order_id
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
    api.shopOrderDetail({token:token,id:id}).then(data => {
      this.setData({
        order: data.order,
        refund_order: data.refund_order
      })
    })
  },
  goToDeliver(e){
    wx.navigateTo({
      url: '/pages/shop/deliver/deliver?order_id='+this.data.order_id,
    })
  },
  goToRefund(){
    wx.navigateTo({
      url: '/pages/shop/refund/refund?order_id=' + this.data.order_id,
    })
  },
  goToWaybill(e){
    console.log(e)
    var refund_id = e.currentTarget.dataset.refundId
    wx.navigateTo({
      url: '/pages/shop/waybill/waybill?refund_id=' + refund_id,
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
  }
})