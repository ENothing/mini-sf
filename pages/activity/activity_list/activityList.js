import api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kword: "",
    activityList: [],
    page: 1,
    last_page: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.activityList(this.data.page).then(data => {
      console.log(data)
      this.setData({
        last_page: data.last_page,
        activityList: data.activities
      })

    })
  },

 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.last_page == this.data.page) {
      return
    }
    this.setData({
      page: this.data.page + 1
    })
    api.activityList(this.data.page).then(data => {

      var that = this;

      var arr1 = that.data.activityList; //从data获取当前datalist数组
      var arr2 = data.activities
      arr1 = arr1.concat(arr2); //合并数组
      that.setData({
        activityList: arr1 //合并后更新datalist
      })
    })
  },


})