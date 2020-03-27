import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:0,
    order:"",
    token:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.id
    var token = wx.getStorageSync('token')
    this.setData({
      order_id:order_id,
      token:token
    })

  },
  onShow: function (options) {
    var token = wx.getStorageSync('token')
    api.activityOrderDetail({token:token,id:this.data.order_id}).then(data => {
      this.setData({
        order: data
      })
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
  },
  goToRefund(){
    wx.navigateTo({
      url: '/pages/activity/refund/refund?order_id=' + this.data.order_id,
    })
  },
  finishOrder(){
    api.activityFinish({token:this.data.token,id:this.data.order_id}).then(data => {
      this.onShow() 
    })
  }
})