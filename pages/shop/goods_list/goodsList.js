// pages/shop/goods_list/goodsList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  GoToGoodsDetail: function (res) {
    console.log(res);
    var id = res.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shop/detail/detail',
    })

  },
})