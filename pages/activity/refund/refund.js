// pages/shop/refund/refund.js
import http from '../../../utils/http.js'
import api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: 0,
    token:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.order_id
    var token = wx.getStorageSync('token')
    this.setData({
      order_id: order_id,
      token:token
    })
  },
  formSubmit: function (e) {
    var order_id = this.data.order_id
    var reason = e.detail.value.reason
    if (reason == "" || reason == undefined) {
      wx.showToast({
        icon: "none",
        title: "申请原因不能为空哦~"
      })
      return
    }
    api.activityInitiateRefund({token:this.data.token,order_id:order_id,reason:reason}).then(data => {
      wx.showToast({
        icon: "none",
        title: "申请退款成功，等待审批",
        duration: 2000,
        success: function () {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    })

  },
})