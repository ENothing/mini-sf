const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo: null,
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

    console.log(app.globalData.userInfo)

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.setData({
        userInfo: app.globalData.userInfo
      })
     },
  },
  methods: {

  }
})