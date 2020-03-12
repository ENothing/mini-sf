// pages/shop/search/search.js
import api from '../../../utils/api.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    inputkey: "",
    history: "",
    hot: null,
    dynamic: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.activitySearchHistory().then(data => {
      this.setData({
        history: data.history,
        hot: data.hot
      })
    })
    console.log(this.data.history)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  bindKeyInput(e) {
    var key = e.detail.value.replace(/\s+/g, '')
    console.log(key)
    if (key) {
      api.activityDynamicHistory(key).then(data => {
        this.setData({
          dynamic: data,
        })
      })
    } else {
      this.setData({
        dynamic: null,
      })
    }


    this.setData({
      inputkey: key
    })
  },
  clearInput() {
    this.setData({
      inputkey: "",
      dynamic: null,
    })
  },
  goToGoodsList(e) {
    var kword = e.currentTarget.dataset.kword
    console.log(e)
    wx.navigateTo({
      url: '/pages/activity/activity_list/activityList?kword=' + kword,
    })
  },
  searchSubmit(e) {
    var kword = e.detail.value.replace(/\s+/g, '')
    if (kword) {
      wx.navigateTo({
        url: '/pages/activity/activity_list/activityList?kword=' + kword,
      })
    }
  },
  delHistory() {
    var that = this
    api.delactivitySearchHistory().then(data => {
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