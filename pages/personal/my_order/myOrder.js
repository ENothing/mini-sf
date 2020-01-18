const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    tabNav: ['全部', '待付款', '进行中','历史订单']
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})