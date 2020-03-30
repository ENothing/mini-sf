import api from '../../../utils/api.js'

const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    page: 1,
    orders: "",
    last_page: 1,
    status: "",
    token: ""
  },
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
    api.shopOrderList({ token: token, page: 1, status: this.data.status }).then(data => {
      this.setData({
        orders: data.orders,
        last_page: data.last_page
      })

    })
  },
  onReachBottom: function () {
    if (this.data.last_page == this.data.page) {
      return
    }
    this.setData({
      page: this.data.page + 1
    })
    var that = this;
    api.shopOrderList({ token: that.data.token, page: this.data.page, status: this.data.status }).then(data => {
      var arr1 = that.data.orders;
      var arr2 = data.orders
      arr1 = arr1.concat(arr2);
      that.setData({
        orders: arr1
      })
    })
  },
  tabSelect(e) {
    var status = e.currentTarget.dataset.id
    api.shopOrderList({token:this.data.token,page:1,status:status}).then(data => {
      console.log(data)
      this.setData({
        orders: data.orders,
        last_page: data.last_page,
        page: 1
      })
    })
    this.setData({
      status: status,
    })
  },
  goToOrderDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shop/order_detail/orderDetail?id=' + id,
    })
  }
})