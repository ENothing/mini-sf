import api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: 0,
    token: "",
    deliver:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var order_id = options.order_id

    var token = wx.getStorageSync('token')
    this.setData({
      order_id: order_id,
      token: token
    })

    wx.showLoading({
      title: '获取中...',
    })
    api.shopDeliver({
      order_id: order_id,
      token: token
    }).then(data => {
      this.setData({
        deliver:data
      })
      wx.hideLoading()
    })


  },
  copyDeliverNo: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  }
})