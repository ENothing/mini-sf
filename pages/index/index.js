Page({
  data: {
    PageCur: 'activity'
  },
  onLoad(options) {
    console.log(options.PageCur)
    var pageCur = options.PageCur
    if (pageCur != undefined){
      this.setData({
        PageCur: pageCur
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