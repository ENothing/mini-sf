import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityCates:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.activityCates().then(data => {
      this.setData({
        activityCates: data
      })
    })
  },
  goToActivityList(e) {
    var cate_id = e.currentTarget.dataset.id
    console.log(e)
    wx.navigateTo({
      url: '/pages/activity/activity_list/activityList?cate_id=' + cate_id,
    })
  }
})