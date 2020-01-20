import api from '../../../utils/api.js'

const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    scrollHeight: app.globalData.scrollHeight,
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
    },
    page:1,
    last_page:0,
    articles:""
  },
  attached() {
    api.articleList(this.data.page).then(data => {
      console.log(data)
      this.setData({
        last_page: data.last_page,
        articles: data.articles
      })

    })
  },
  methods: {

    handleExpand: function (event) {
      console.log(event.detail)
      console.log('expand call back')
    },

    // 点击卡片
    tapCard: function (event) {
      wx.navigateTo({
        url: '/pages/bbs/article_detail/articleDetail?id=' + event.detail.card_id,
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
      if (this.data.last_page == this.data.page) {
        return
      }
      this.setData({
        page: this.data.page + 1
      })
      api.articleList(this.data.page).then(data => {

        var that = this;

        var arr1 = that.data.articles; //从data获取当前datalist数组
        var arr2 = data.articles
        arr1 = arr1.concat(arr2); //合并数组
        that.setData({
          articles: arr1 //合并后更新datalist
        })
        console.log(arr1)

      })

    }

  }
})