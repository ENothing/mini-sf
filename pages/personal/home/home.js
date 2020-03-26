import api from '../../../utils/api.js'

const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo: null,
    follows: 0,
    is_followed: 0,
    aorder: 0,
    sorder: 0,
  },
  attached() {
    let that = this;

    var token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        icon: "none",
        title: "请先登录",
        duration: 2000,
        success: function() {
          wx.navigateTo({
            url: '/pages/personal/login/login',
          })
        }
      })
    }
    this.setData({
      userInfo: app.globalData.userInfo
    })
    api.userInfo().then(data => {
      console.log(data)
      this.setData({
        follows: data.user_info.follows,
        is_followed: data.user_info.is_followed,
        aorder: data.aorder_unpay,
        sorder: data.sorder_unpay,
      })
    })
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    },
  },
  methods: {
    follows(){
      wx.navigateTo({
        url: '/pages/personal/follows/follows',
      })
    },
    followed(){
      wx.navigateTo({
        url: '/pages/personal/followed/followed',
      })
    }
  }
})