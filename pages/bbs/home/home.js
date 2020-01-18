const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    scrollHeight: app.globalData.scrollHeight,
    page:1,
    dataSet: [
      {
        id: '5b61575a4256350d332d03a1',
        title: '在成都一定要做的50件小事，每一件都值得',
        time: 1533106010,
        user: {
          avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
          userId: 123123123,
          username: 'Lorem '
        },
        likedCount: 2689,
        liked: true,
        images: [
          'https://bpic.588ku.com//back_origin_min_pic/19/09/03/a7e47b6993d946f79d003bfd8299e5e2.jpg',
        ]
      },
      {
        id: '5b61575a4256350d332d03a2',
        title: 'Lorem ip',
        time: 1533106010,
        user: {
          avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
          userId: 123123123,
          username: 'Lorem '
        },
        likedCount: 122,
        liked: false,
        images: [
          'https://bpic.588ku.com//back_origin_min_pic/19/09/03/19bbff2fdd697027acfd3ce9dc21c876.jpg',
        ]
      },
      {
        id: '5b61575a4256350d332d03a3',
        title: 'Lorem ip',
        time: 1533106010,
        user: {
          avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
          userId: 123123123,
          username: 'Lorem '
        },
        likedCount: 122,
        liked: true,
        images: [
          'https://bpic.588ku.com//back_origin_min_pic/19/09/29/27f66680431ce221e789f3885acc0043.jpg',
        ]
      },
      {
        id: '5b61575a4256350d332d03a4',
        title: 'Lorem ip',
        time: 1533106010,
        user: {
          avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
          userId: 123123123,
          username: 'Lorem '
        },
        likedCount: 122,
        liked: true,
        images: [
          'https://bpic.588ku.com//back_origin_min_pic/19/09/03/2050c7c44fabbfe6cfb74a55e8d5afb1.jpg',
        ]
      },
      {
        id: '5b61575a4256350d332d03a122',
        title: 'Lorem ip',
        time: 1533106010,
        user: {
          avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
          userId: 123123123,
          username: 'Lorem '
        },
        likedCount: 122,
        liked: true,
        images: [
          'https://bpic.588ku.com//back_origin_min_pic/19/09/03/926c6c8672c3602a5cf4813c6db95186.jpg',
        ]
      },
    ],
    brick_option: {
      backgroundColor:"#fafafa",
      defaultExpandStatus: true,
      imageFillMode:'widthFix',
      columns: 2,
      forceRepaint: false,
      icon: {
        fill: '/images/likefill.png',
        default:'/images/like.png',
      },
      fontColor:'black'
    }
  },
  attached() {

  },
  methods: {

    handleExpand: function (event) {
      console.log(event.detail)
      console.log('expand call back')
    },

    // 点击卡片
    tapCard: function (event) {
      console.log(event.detail)
      console.log('tap card!')
      wx.navigateTo({
        url: '/pages/bbs/article_detail/articleDetail',
      })

    },

    // 点赞
    handleLike: function (event) {
      console.log(event)
      console.log('like!')
    },

    // 点击用户头像区域
    handleUserEvent: function (event) {
      console.log(event.detail)
      console.log('user!')
    },

    scrollBottom(e) {
      console.log("button")
      var that = this;

      var arr1 = that.data.dataSet; //从data获取当前datalist数组
      var arr2 = [
        {
          id: '5b61575a4256350d332d03a1',
          title: 'Lorem ip',
          time: 1533106010,
          user: {
            avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
            userId: 123123123,
            username: 'Lorem '
          },
          likedCount: 122,
          liked: true,
          images: [
            'https://bpic.588ku.com//back_origin_min_pic/19/09/03/a7e47b6993d946f79d003bfd8299e5e2.jpg',
          ]
        },
        {
          id: '5b61575a4256350d332d03a2',
          title: 'Lorem ip',
          time: 1533106010,
          user: {
            avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
            userId: 123123123,
            username: 'Lorem '
          },
          likedCount: 122,
          liked: true,
          images: [
            'https://bpic.588ku.com//back_origin_min_pic/19/09/03/19bbff2fdd697027acfd3ce9dc21c876.jpg',
          ]
        },
        {
          id: '5b61575a4256350d332d03a3',
          title: 'Lorem ip',
          time: 1533106010,
          user: {
            avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
            userId: 123123123,
            username: 'Lorem '
          },
          likedCount: 122,
          liked: true,
          images: [
            'https://bpic.588ku.com//back_origin_min_pic/19/09/29/27f66680431ce221e789f3885acc0043.jpg',
          ]
        },
        {
          id: '5b61575a4256350d332d03a4',
          title: 'Lorem ip',
          time: 1533106010,
          user: {
            avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
            userId: 123123123,
            username: 'Lorem '
          },
          likedCount: 122,
          liked: true,
          images: [
            'https://bpic.588ku.com//back_origin_min_pic/19/09/03/2050c7c44fabbfe6cfb74a55e8d5afb1.jpg',
          ]
        },
        {
          id: '5b61575a4256350d332d03a122',
          title: 'Lorem ip',
          time: 1533106010,
          user: {
            avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
            userId: 123123123,
            username: 'Lorem '
          },
          likedCount: 122,
          liked: true,
          images: [
            'https://bpic.588ku.com//back_origin_min_pic/19/09/03/926c6c8672c3602a5cf4813c6db95186.jpg',
          ]
        },
      ],
      arr1 = arr1.concat(arr2); //合并数组
      that.setData({
        dataSet: arr1 //合并后更新datalist
      })

    }

  }
})