import api from '../../../utils/api.js'
Page({
  data: {
    activity:[],
    last_page:1,
    page:1,
    modalName:"",
    choose_id:0,
  },
  onLoad: function (options) {
    api.per_collect(1).then(data => {
      console.log(data)
      this.setData({
        activity:data.list,
        last_page:data.last_page,
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
    api.per_collect(this.data.page).then(data => {
      var arr1 = that.data.activity;
      var arr2 = data.list
      arr1 = arr1.concat(arr2);
      that.setData({
        activity: arr1
      })
    })
  },
  showModal(e){
    console.log(e)
    var id = e.currentTarget.dataset.id

    this.setData({
      choose_id: id,
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  unlike(){
    this.setData({
      modalName: null
    })
    api.articlelike(this.data.choose_id).then(data => {
      this.onLoad()

    })
  },
  goToAritlceDetial(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/bbs/article_detail/articleDetail?id=' + id,
    })
  }
})