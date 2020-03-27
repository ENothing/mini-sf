import api from '../../../utils/api.js'
Page({
  data: {
    articles: 1,
    page: 1,
    modalName: "",
    choose_id: 0,
    is_publish:0,
    status:0,
    token: ""
  },
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    api.myArticle({ token: token,page:1}).then(data => {
      console.log(data)
      this.setData({
        articles: data.articles,
        last_page: data.last_page,
        token: token
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
    api.myArticle({ token: this.data.token, page: this.data.page }).then(data => {
      var arr1 = that.data.articles;
      var arr2 = data.articles
      arr1 = arr1.concat(arr2);
      that.setData({
        articles: arr1
      })
    })
  },
  showModal(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var is_publish = e.currentTarget.dataset.isPublish
    var status = e.currentTarget.dataset.status

    this.setData({
      choose_id: id,
      modalName: e.currentTarget.dataset.target,
      is_publish,
      status
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  goToAritlceDetial(e) {
    var id = e.currentTarget.dataset.id
    var is_publish = e.currentTarget.dataset.isPublish
    var status = e.currentTarget.dataset.status

    if (is_publish == 0 || status == 0){
      wx.showToast({
        icon: "none",
        title: "暂未发布",
        duration: 1000,
      })
      return;
    }

    wx.navigateTo({
      url: '/pages/bbs/article_detail/articleDetail?id=' + id,
    })
  },
  goToPost(){

    wx.navigateTo({
      url: '/pages/bbs/editor/editor',
    })
    this.setData({
      modalName: null
    })
  },
  goToEdit(){

    var choose_id = this.data.choose_id
    console.log(choose_id)

    wx.navigateTo({
      url: '/pages/bbs/editor/editor?id=' + choose_id,
    })


    this.setData({
      modalName: null
    })
  },
  doPublish(){
    var choose_id = this.data.choose_id
    var that = this

    wx.showModal({
      title: '提示',
      content: '确认发布当前作品？',
      success(res) {
        if (res.confirm) {
          api.publishArticle({ token: this.data.token, id: choose_id}).then(data => {

            that.onLoad()

            wx.showToast({
              icon: "none",
              title: "文章发布成功，等待审核",
              duration: 1000,
            })


          })
        } 
      }
    })
    this.setData({
      modalName: null
    })
  },
  goToDelete(){
    var choose_id = this.data.choose_id
    var that = this
    
    wx.showModal({
      title: '提示',
      content: '确认删除当前作品？',
      success(res) {
        if (res.confirm) {
          api.delArticle({ token: this.data.token, id: choose_id }).then(data => {

            that.onLoad()

            wx.showToast({
              icon: "none",
              title: "文章删除成功",
              duration: 1000,
            })


          })
        } 
      }
    })
    this.setData({
      modalName: null
    })
  }
})