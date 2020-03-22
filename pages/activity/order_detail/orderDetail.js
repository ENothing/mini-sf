import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:0,
    order:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.id
    console.log(order_id)
    this.setData({
      order_id:order_id
    })




    api.activityOrderDetail(order_id).then(data => {
      console.log(data)
      this.setData({
        order:data
      })

    })









  },


})