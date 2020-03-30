import api from '../../../utils/api.js'



Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo: "",
    follows: 0,
    is_followed: 0,
    aorder: 0,
    sorder: 0,
  },
  attached() {
    var token = wx.getStorageSync('token')
    var userInfo = wx.getStorageSync('user')
    this.setData({
      token,
      userInfo
    })
    if (!token) {
      wx.navigateTo({
        url: '/pages/personal/login/login',
      })
    }

    api.userInfo(token).then(data => {
      this.setData({
        follows: data.user_info.follows,
        is_followed: data.user_info.is_followed,
        aorder: data.aorder_unpay,
        sorder: data.sorder_unpay,
        userInfo: userInfo
      })
    })
  },

  pageLifetimes: {
    show: function() {
      var token = wx.getStorageSync('token')
      var userInfo = wx.getStorageSync('user')
      api.userInfo(token).then(data => {
        // console.log(data)
        this.setData({
          follows: data.user_info.follows,
          is_followed: data.user_info.is_followed,
          aorder: data.aorder_unpay,
          sorder: data.sorder_unpay,
          userInfo: userInfo,
          token: token
        })
      })
      this.setData({
        token: token
      })
    },
  },

  methods: {
    follows() {
      if (this.toLogin()) {
        wx.navigateTo({
          url: '/pages/personal/follows/follows',
        })
      }

    },
    followed() {
      if (this.toLogin()) {
        wx.navigateTo({
          url: '/pages/personal/followed/followed',
        })
      }
    },
    goToActivityOrder() {
      if (this.toLogin()) {
        wx.navigateTo({
          url: '/pages/personal/aorder/aorder',
        })
      }
    },
    goToGorder() {
      if (this.toLogin()) {
        wx.navigateTo({
          url: '/pages/personal/gorder/gorder',
        })
      }
    },
    goToCoupon() {
      if (this.toLogin()) {
        wx.navigateTo({
          url: '/pages/personal/coupon/coupon',
        })
      }
    },
    goToLikes() {
      if (this.toLogin()) {
        wx.navigateTo({
          url: '/pages/personal/likes/likes',
        })
      }
    },
    goToAddress() {
      if (this.toLogin()) {
        wx.navigateTo({
          url: '/pages/personal/address/address',
        })
      }
    },
    goToFeedback() {
      if (this.toLogin()) {
        wx.navigateTo({
          url: '/pages/personal/feedback/feedback',
        })
      }
    },
    goToArticle() {
      if (this.toLogin()) {
        wx.navigateTo({
          url: '/pages/personal/article/article',
        })
      }
    },
    toLogin() {
      if (!this.data.token) {
        wx.showToast({
          icon: "none",
          title: "请先授权",
          duration: 1000,
          success: function() {
            wx.navigateTo({
              url: '/pages/personal/login/login',
            })
          }
        })
        return false
      } else {
        return true
      }
    }
  },

})