import api from '../../../utils/api.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    VerticalNavTop: 0,
    id:0,
    user:"",
    TabCur: 0,
    articles:[],
    my_last_page:1,
    my_page:1,
    article_id:0
  },
  onLoad: function (options) {
    console.log(options)
    var id = options.id
    this.setData({
      id:id
    })

  },
  onShow: function () {
    api.userDetail(this.data.id).then(data => {
      console.log(data)
      this.setData({
        user: data
      })
    })
    api.userArticles(this.data.id,1).then(data => {
      console.log(data)
      this.setData({
        articles: data.articles,
        my_last_page: data.last_page,
      })
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  lower(){
    console.log(123)

    if (this.data.my_last_page == this.data.my_page) {
      return
    }
    this.setData({
      my_page: this.data.my_page + 1
    })
    api.articleList(this.data.my_page).then(data => {

      var that = this;

      var arr1 = that.data.articles; //从data获取当前datalist数组
      var arr2 = data.articles
      arr1 = arr1.concat(arr2); //合并数组
      that.setData({
        articles: arr1 //合并后更新datalist
      })
      console.log(arr1)

    })
  },
  showModal(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id

    this.setData({
      article_id: id,
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  goToAritlceDetial(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/bbs/article_detail/articleDetail?id=' + id,
    })
  },
  editArticle(){
    console.log(this.data.article_id)


  }
})