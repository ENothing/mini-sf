Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567943398452&di=b0df3f402e370fb63979b4c5d5faf1f3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0118cf5837d75ea801219c77f35e67.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567943448950&di=68305129111a7830b1096c8f1dd2101e&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a82d585229d2a8012060c83f0a5d.jpg',
    }],

    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 0,
      name: '返校'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 0,
      name: '球鞋'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '女神'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 0,
      name: 'T-shirt'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '卫衣'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '帆布'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '短裤'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '配件'
    }],
    gridCol: 4,
    skin: false
  },
  attached() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  methods: {
    GoToGoodsDetail: function (res) {
      console.log(res);
      var id = res.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/shop/detail/detail',
      })

    },
    goToAllCategory:function(){

      wx.navigateTo({
        url: '/pages/shop/detail/detail',
      })

    }


  }
})