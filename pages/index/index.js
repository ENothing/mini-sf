Page({
  data: {
    PageCur: 'activity'
  },
  onLoad(options) {
    var pageCur = options.pageCur
    if (pageCur != ""){
      this.setData({
        pageCur: pageCur
      })
    }
  },
  onReachBottom() {
    if (this.data.PageCur =="activity"){
      this.selectComponent("#activity").getList();
    } 
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