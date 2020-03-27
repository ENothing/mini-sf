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
          userInfo: userInfo
        })
      })
    },
  },

  methods: {
    follows() {
      wx.navigateTo({
        url: '/pages/personal/follows/follows',
      })
    },
    followed() {
      wx.navigateTo({
        url: '/pages/personal/followed/followed',
      })
    }
  }
})