import api from '../../../utils/api.js'

const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    page:1,
    orders:"",
    last_page:1,
    status:""
  },
  onLoad: function (options) {

    api.shopOrderList(this.data.page, this.data.status).then(data => {
      console.log(data)
      this.setData({
        orders:data.orders,
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
    api.shopOrderList(this.data.page, this.data.status).then(data => {
      var arr1 = that.data.orders;
      var arr2 = data.orders
      arr1 = arr1.concat(arr2);
      that.setData({
        orders: arr1
      })
    })
  },
  tabSelect(e) {
    // console.log(e);
    var status =  e.currentTarget.dataset.id
    api.shopOrderList(1, status).then(data => {
      console.log(data)
      this.setData({
        orders: data.orders,
        last_page: data.last_page
      })
    })
    this.setData({
      status: status,
    })
  },
  goToOrderDetail(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shop/order_detail/orderDetail?id=' + id,
    })
  }
})