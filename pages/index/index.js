import api from '../../utils/api.js'
const app = getApp();
Page({
  data: {
    PageCur: 'activity',
    userInfo: {},
    userStatistics: {}
  },
  onLoad(options) {
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
    var token = wx.getStorageSync('token')
    if (!token){

      wx.showToast({
        icon: "none",
        title: "请先登录",
        duration: 1000,
        success: function () {
          wx.navigateTo({
            url: '/pages/personal/login/login',
          })
        }
      })
      return

    }


    wx.navigateTo({
      url: '/pages/bbs/editor/editor',
    })

  }

})