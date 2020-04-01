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
    id: 0,
    user: "",
    TabCur: 0,
    articles: [],
    my_last_page: 1,
    my_page: 1,
    larticles: [],
    l_last_page: 1,
    l_page: 1,
    attention: 0,
    isFollowed: 0
  },
  onLoad: function(options) {
    var token = wx.getStorageSync('token')
    var id = options.id
    this.setData({
      id: id,
      token: token
    })

  },
  onShow: function() {
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
    api.userDetail({
      token: token,
      id: this.data.id
    }).then(data => {
      console.log(data)
      this.setData({
        user: data,
        attention: data.attention,
        isFollowed: data.is_followed
      })
    })
    api.userArticles(this.data.id, 1).then(data => {
      this.setData({
        articles: data.articles,
        my_last_page: data.last_page,
      })
    })

    api.userLikeArticles(this.data.id, 1).then(data => {
      console.log(data)
      this.setData({
        larticles: data.list,
        l_last_page: data.last_page,
      })
    })



  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  lower() {

    if (this.data.my_last_page == this.data.my_page) {
      return
    }
    this.setData({
      my_page: this.data.my_page + 1
    })
    api.userArticles(this.data.id, this.data.my_page).then(data => {
      var that = this;
      var arr1 = that.data.articles; //从data获取当前datalist数组
      var arr2 = data.articles
      arr1 = arr1.concat(arr2); //合并数组
      that.setData({
        articles: arr1 //合并后更新datalist
      })
    })
  },
  llower() {

    if (this.data.l_last_page == this.data.l_page) {
      return
    }
    this.setData({
      l_page: this.data.l_page + 1
    })
    api.userLikeArticles(this.data.id, this.data.l_page).then(data => {
      var that = this;
      var arr1 = that.data.larticles; //从data获取当前datalist数组
      var arr2 = data.list
      arr1 = arr1.concat(arr2); //合并数组
      that.setData({
        larticles: arr1 //合并后更新datalist
      })
    })
  },
  goToAritlceDetial(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/bbs/article_detail/articleDetail?id=' + id,
    })
  },
  followAndUnfollow(e) {
    var atten = this.data.attention
    var isFollowed = this.data.isFollowed

    api.userFollows({
      token: this.data.token,
      follow_id: this.data.id
    }).then(data => {

      if (atten == 0) {

        isFollowed = isFollowed + 1

      } else {

        isFollowed = isFollowed > 0 ? isFollowed - 1 : 0
      }

      this.setData({
        attention: atten == 0 ? 1 : 0,
        isFollowed: isFollowed
      })

    })
  },
  follows(e) {
    var is_me = e.currentTarget.dataset.isMe

    if (is_me == 1) {

      wx.navigateTo({
        url: '/pages/personal/follows/follows',
      })


    } else {

      wx.navigateTo({
        url: '/pages/bbs/follows/follows?id=' + this.data.id,
      })

    }

    console.log(e)

  },
  followed(e) {
    var is_me = e.currentTarget.dataset.isMe

    if (is_me == 1) {

      wx.navigateTo({
        url: '/pages/personal/followed/followed',
      })


    } else {

      wx.navigateTo({
        url: '/pages/bbs/followed/followed?id=' + this.data.id,
      })

    }

    console.log(e)

  }
})