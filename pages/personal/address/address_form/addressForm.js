Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    region: ['四川省', '成都市', '锦江区'],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    if(id != undefined){
      this.setData({
        id: options.id
      })
    }
  },

  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },




})