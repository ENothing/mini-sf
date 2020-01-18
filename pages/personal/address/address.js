// pages/personal/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresses:[{
      id:1,
      name:"test",
      phone:"181****5061",
      address:"四川省成都市高新区环球中心",
      is_default:1
    }, {
        id: 2,
        name: "test",
        phone: "181****5061",
        address: "四川省成都市高新区环球中心",
        is_default: 0
      }, {
        id: 3,
        name: "test",
        phone: "181****5061",
        address: "四川省成都市高新区环球中心",
        is_default: 0
      }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  goToForm(e){
    console.log()
    var id = e.currentTarget.dataset.id;
    var url = '/pages/personal/address/address_form/addressForm'

    if(id != undefined){

      url = url + "?id=" + id

    }
    wx.navigateTo({
      url: url,
    })

  },

  delAddress(e){
    wx.showModal({
      title: '删除地址',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {

        }
      }
    })
  }

})