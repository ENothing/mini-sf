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

})