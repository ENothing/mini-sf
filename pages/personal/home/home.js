const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo: null,
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    avatar: [
      'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
    ],
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
    gridCol: 3,
    skin: false
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
  show: function () {
    console.log(123123)
  },
  methods: {

  }
})