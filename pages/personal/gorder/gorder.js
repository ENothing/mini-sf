import api from '../../../utils/api.js'

const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    tabNav: ['全部', '待付款', '进行中', '已完成', '退款中'],
    page:1,
    orders:"",
    last_page:1,
  },
  onLoad: function (options) {

    api.shopOrderList(this.data.page,0).then(data => {
      console.log(data)
      this.setData({
        orders:data.orders,
        last_page: data.last_page
      })

    })



  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})