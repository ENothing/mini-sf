// pages/activity/enter/enter.js
import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    activity: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    console.log(id)
    api.activityDetail(id).then(data => {
      console.log(data)
      this.setData({
        activity: data
      })

    })
    this.setData({
      id: id
    })
  },

})