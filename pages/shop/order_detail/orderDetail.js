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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    console.log("order_id:"+id)
    this.setData({
      order_id: id,
    })

    api.shopOrderDetail(id).then(data => {
      console.log(data)
      this.setData({
        order:data.order,
        refund_order:data.refund_order
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