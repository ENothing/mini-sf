import api from '../../../utils/api.js'
const app = getApp();

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    inputkey:"",
    history:"",
    hot:null,
    dynamic:null,
    token:""
  },
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    this.setData({
          token: token
      })
    api.shopSearchHistory(token).then(data => {
      this.setData({
        history:data.history,
        hot:data.hot
      })
    })
  },
  bindKeyInput(e){
    var key = e.detail.value.replace(/\s+/g, '')
    if(key){
      api.shopDynamicHistory(key).then(data => {
        this.setData({
          dynamic: data,
        })
      })
    }else{
      this.setData({
        dynamic: null,
      })
    }
    this.setData({
      inputkey: key
    })
  },
  clearInput(){
    this.setData({
      inputkey: "",
      dynamic: null,
    })
  },
  goToGoodsList(e){
    var kword = e.currentTarget.dataset.kword
    wx.navigateTo({
      url: '/pages/shop/goods_list/goodsList?kword=' + kword,
    })
  },
  searchSubmit(e){
    var kword = e.detail.value.replace(/\s+/g, '')
    if (kword) {
      wx.navigateTo({
        url: '/pages/shop/goods_list/goodsList?kword=' + kword,
      })
    }
  },
  delHistory(){
    var that = this
    api.delShopSearchHistory(this.data.token).then(data => {
      wx.showToast({
        icon: "none",
        title: "清除历史搜索成功~",
        success: function () {
          that.setData({
            history: "",
          })
        }
      })
    })
  }
})