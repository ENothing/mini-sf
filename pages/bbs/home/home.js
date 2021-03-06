import api from '../../../utils/api.js'

const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    scrollHeight: app.globalData.scrollHeight,
    brick_option: {
      backgroundColor: "#fafafa",
      defaultExpandStatus: true,
      imageFillMode: 'widthFix',
      columns: 2,
      forceRepaint: false,
      icon: {
        fill: '/images/likefill.png',
        default: '/images/like.png',
      },
      fontColor: 'black'
    },
    page: 1,
    last_page: 0,
    articles: "",
    token: ""
  },
  attached() {
    var token = wx.getStorageSync('token')
    console.log(token)
    this.setData({
      token: token
    })
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this
    api.articleList({
      token: token,
      page: 1
    }).then(data => {
      that.setData({
        last_page: data.last_page,
        articles: data.articles,
      })
      wx.hideLoading()
    })
  },
  pageLifetimes: {
    show: function() {
      var token = wx.getStorageSync('token')
      this.setData({
        token: token
      })
    },
  },
  methods: {
    tapCard: function(event) {
      wx.navigateTo({
        url: '/pages/bbs/article_detail/articleDetail?id=' + event.detail.card_id,
      })

    },
    handleLike: function(e) {
      var liked = e.detail.liked
      var id = e.detail.card_id


        api.articlelike({
          token: this.data.token,
          id: id
        }).then(data => {

          if (liked) {
            wx.showToast({
              icon: "none",
              title: "不喜欢！",
            })
          } else {
            wx.showToast({
              icon: "none",
              title: "喜欢！",
            })
          }

        })

    },

    // 点击用户头像区域
    handleUserEvent: function(e) {
      var user_id = e.detail.user_id
      wx.navigateTo({
        url: '/pages/bbs/index/index?id=' + user_id,
      })
    },

    scrollBottom(e) {
      if (this.data.last_page == this.data.page) {
        return
      }
      this.setData({
        page: this.data.page + 1
      })
      api.articleList({
        token: this.data.token,
        page: this.data.page
      }).then(data => {

        var that = this;

        var arr1 = that.data.articles; //从data获取当前datalist数组
        var arr2 = data.articles
        arr1 = arr1.concat(arr2); //合并数组
        that.setData({
          articles: arr1 //合并后更新datalist
        })
      })

    }

  }
})