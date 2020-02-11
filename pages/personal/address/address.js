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
    page_status:0,
    goods_spu_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var status = options.status
    var goods_spu_id = options.goods_spu_id
    if (status != undefined && goods_spu_id != undefined && goods_spu_id != 0){
      this.setData({
        page_status:1,
        goods_spu_id: goods_spu_id,
      })
    }
  },
  onShow:function(){
    var checked = 0
    api.addressList().then(data => {
      if (data.default_count == 0) {
        var checked = null
      } 
      this.setData({
        addresses: data.ship_addresses,
        last_page: data.last_page,
        checked: checked
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
  },
  needGoToOrder(e){
    var id = e.currentTarget.dataset.id

    if(this.page_status != 0){
      wx.navigateTo({
        url: '/pages/shop/order/order?id=' + this.data.goods_spu_id + "&address_id=" + id,
      })

    }










  }

})