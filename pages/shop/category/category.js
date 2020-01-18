const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    scrollHeight: app.globalData.scrollHeight,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    // var list = [{}];
    // for (let i = 0; i < 2; i++) {
    //   list[i] = {};
    //   list[i].name = String.fromCharCode(65 + i);
    //   list[i].id = i;
    // }

    var list = [{
      'name': 'A',
      'id': 1,
      'brands': [{
        'name': 'test',
        'id': 1,
        'img':'http://img.mp.itc.cn/upload/20170328/f960af1aa8f9499097a6be308a068975.png'
      }, {
          'name': 'test',
          'id': 2,
          'img': 'http://img.mp.itc.cn/upload/20170328/f960af1aa8f9499097a6be308a068975.png'
        }, {
          'name': 'test',
          'id': 3,
          'img': 'http://img.mp.itc.cn/upload/20170328/f960af1aa8f9499097a6be308a068975.png'
        }]
    }, {
        'name': 'B',
        'id': 2,
        'brands': [{
          'name': 'test',
          'id': 4,
          'img': 'http://img.mp.itc.cn/upload/20170328/f960af1aa8f9499097a6be308a068975.png'
        }, {
          'name': 'test',
          'id': 5,
          'img': 'http://img.mp.itc.cn/upload/20170328/f960af1aa8f9499097a6be308a068975.png'
        }]
      }];

    console.log(list[0])

    this.setData({
      list: list,
      listCur: list[0],
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    let index = e.currentTarget.dataset.id
    console.log(this.data.list[index])
    this.setData({
      TabCur: index,
      listCur: this.data.list[index],
    })
  },
  goToGoodsList(e){

    wx.navigateTo({
      url: '/pages/shop/goods_list/goodsList?brand_id=' + e.currentTarget.dataset.id,
    })
  }
})