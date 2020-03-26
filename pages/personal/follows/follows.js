import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    last_page: 1,
    page: 1,
    users: [],
    attention:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    api.followList(1).then(data => {
      console.log(data)
      this.setData({
        users: data.list,
        last_page: data.last_page
      })

    })

  },
  onReachBottom: function() {
    if (this.data.last_page == this.data.page) {
      return
    }
    this.setData({
      page: this.data.page + 1
    })
    var that = this;
    api.followList(that.data.page).then(data => {
      var arr1 = that.data.users;
      var arr2 = data.list
      arr1 = arr1.concat(arr2);
      that.setData({
        users: arr1
      })
    })
  },
  goToPerIndex(e) {
    var user_id = e.currentTarget.dataset.userId
    wx.navigateTo({
      url: '/pages/bbs/index/index?id=' + user_id,
    })
  },
  followAndUnfollow(e) {
    var atten = this.data.attention
    var user_id = e.currentTarget.dataset.userId

    api.userFollows(user_id).then(data => {
      var users = this.data.users
      for (var index in users) {
        if (users[index].follow_id == user_id && (users[index].status == 0 || users[index].status == undefined)) {
          users[index].status = 1
        }else{
          users[index].status = 0
        }
        this.setData({
          users: users,
        })
      }
    })
  }
})