import api from '../../../utils/api.js'

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
    api.catesWithBrands().then(data => {
      this.setData({
        list: data,
        listCur: data[0],
      })
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    let index = e.currentTarget.dataset.id
    this.setData({
      TabCur: index,
      listCur: this.data.list[index],
    })
  },
  goToGoodsList(e){
    var brand_id = e.currentTarget.dataset.id
    var cate_id = e.currentTarget.dataset.cateId
    wx.navigateTo({
      url: '/pages/shop/goods_list/goodsList?brand_id=' + brand_id + '&cate_id=' + cate_id,
    })
  }
})