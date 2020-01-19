Page({
  data: {
    PageCur: 'activity'
  },
  onReachBottom() {
    this.selectComponent("#activity").getList();
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  GoToEditor(e){


    wx.navigateTo({
      url: '/pages/bbs/editor/editor',
    })

  }

})