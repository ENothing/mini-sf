import api from '../../utils/api.js'
const app = getApp();
Page({
  data: {
    PageCur: 'activity',
    userInfo: {},
    userStatistics: {}
  },
  onLoad(options) {
    console.log(options.PageCur)
    var pageCur = options.PageCur
    if (pageCur != undefined) {
      this.setData({
        PageCur: pageCur
      })
    }
  },
  onReachBottom() {
    if (this.data.PageCur == "activity") {
      this.selectComponent("#activity").getList();
    }
    if (this.data.PageCur == "shop") {
      this.selectComponent("#shop").getList();
    }
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  GoToEditor(e) {


    wx.navigateTo({
      url: '/pages/bbs/editor/editor',
    })

  }

})