// pages/personal/login/login.js
import api from '../../../utils/api.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {







  },

  getUserInfo: function(e) {


    wx.login({
      success: res => {

        var code = res.code
        wx.getUserInfo({
          success: info => {
            console.log(info)
            app.globalData.userInfo = info.userInfo
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(info)
            }
            var iv = info.iv
            var encryptedData = info.encryptedData
            wx.showLoading({
              title: '登录中',
            })
            api.userLogin(code, iv, encryptedData).then(data => {
              wx.setStorageSync('token', data)
              wx.hideLoading()
              wx.showToast({
                icon: "none",
                title: "登录成功",
                duration: 1000,
                success: function() {
                  // wx.navigateTo({
                  //   url: '/pages/index/index?PageCur=personal',
                  // })

                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            })

          }
        })
      }
    })
  },
})