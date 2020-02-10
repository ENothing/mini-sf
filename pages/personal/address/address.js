// pages/personal/address/address.js
import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresses:"",
    last_page:0,
    checked:0,
    page_status:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)


  },
  onShow:function(){
    api.addressList().then(data => {
      console.log(data)
      this.setData({
        addresses: data.ship_addresses,
        last_page: data.last_page
      })

    })
  },
  goToForm(e){
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
    var id = e.currentTarget.dataset.id;

    wx.showModal({
      title: '删除地址',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          api.delAddress(id).then(data => {
            console.log(data)
            this.setData({
              checked: null,
            })
            wx.showToast({
              icon: "none",
              title: "删除地址成功",
              duration: 1000,
            })
          })
          this.onShow()
        }
      }
    })
  },
  setDefaultAddress(e){
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id

    api.updateDefaultAddress(id).then(data => {
      console.log(data)
      wx.showToast({
        icon: "none",
        title: "设置默认地址成功",
        duration: 1000,
      })
      this.setData({
        checked: index,
      })

    })
  }

})