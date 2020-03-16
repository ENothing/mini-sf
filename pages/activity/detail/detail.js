import api from '../../../utils/api.js'


// pages/activity/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    activity:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
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
  goToEnter(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/activity/enter/enter?id=' + id,
    }) 
  },
  call(e){
    console.log(e)
    var mobile = e.currentTarget.dataset.mobile
    wx.makePhoneCall({
      phoneNumber: mobile //仅为示例，并非真实的电话号码
    })
  },
  likeOrUnlike(e){
  }
})