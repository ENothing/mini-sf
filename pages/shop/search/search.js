// pages/shop/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputkey:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  bindKeyInput(e){
    var key = e.detail.value
    this.setData({
      inputkey: key
    })
    console.log(e)
  },
  clearInput(){
    this.setData({
      inputkey: ""
    })
  }


})