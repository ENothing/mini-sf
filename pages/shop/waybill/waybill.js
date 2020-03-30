// pages/shop/waybill/waybill.js
import api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refund_id: 0,
    expressArr: [{
      id: 745,
      name: "顺丰速运",
    },
    {
      id: 779,
      name: "申通快递",
    },
    ],
    e_index: 0,
    token: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    var refund_id = options.refund_id
    this.setData({
      refund_id: refund_id,
      token: token
    })

  },
  PickerChange(e) {
    this.setData({
      e_index: e.detail.value
    })
  },
  formSubmit(e) {
    var refund_id = this.data.refund_id
    var express_n = e.detail.value.express_n
    var express_id = e.detail.value.express_id

    if (express_n == "" || express_n == undefined) {
      wx.showToast({
        icon: "none",
        title: "运单号不能为空",
      })
      return;
    }

    api.shopReturnInfo({
      token: this.data.token,
      refund_id: refund_id,
      express_n: express_n,
      express_id: express_id
    }).then(data => {
      wx.showToast({
        icon: "none",
        title: "填写运单完成，等待审核",
        duration: 1000,
        success: function () {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    })
  }



})