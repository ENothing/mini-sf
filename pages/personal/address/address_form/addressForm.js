import api from '../../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    region: ['四川省', '成都市', '锦江区'],
    address: "",
    name: "",
    mobile: "",
    detail_address: "",
    token:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    var id = options.id
    this.setData({
      id:id,
      token: token
    })
    if (id != undefined) {
      api.addressDetail({token:token,id:id}).then(data => {
        this.setData({
          id: options.id,
          name: data.name,
          mobile: data.mobile,
          detail_address: data.detail_address,
          region: [data.province, data.city, data.district]
        })

      })
    }
  },
  onShow:function(){
    var token = wx.getStorageSync('token')
    this.setData({
          token: token
      })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit(e) {
    var name = e.detail.value.name
    var mobile = e.detail.value.mobile
    var region = e.detail.value.region
    var detail_address = e.detail.value.detail_address

    if(name == ""){
      wx.showToast({
        icon: "none",
        title: "姓名不能为空哦~",
      })
      return;
    }
    if (mobile == "") {
      wx.showToast({
        icon: "none",
        title: "手机号不能为空哦~",
      })
      return;
    }
    if (detail_address == "") {
      wx.showToast({
        icon: "none",
        title: "详细地址不能为空哦~",
      })
      return;
    }

    if (this.data.id != 0) {
      api.updateAddress({
        token: this.data.token,
        id: this.data.id,
        name: name,
        mobile: mobile,
        province: region[0],
        city: region[1],
        district: region[2],
        detail_address: detail_address
      }
      ).then(data => {
        if (data == null) {
          wx.showToast({
            icon: "none",
            title: "修改地址成功",
            duration: 1000,
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })

    } else {

      api.addAddress({
        name: name,
        mobile: mobile,
        province: region[0],
        city: region[1],
        district: region[2],
        detail_address: detail_address,
        token:this.data.token
      }).then(data => {
        if (data == null) {
          wx.showToast({
            icon: "none",
            title: "新增地址成功",
            duration: 1000,
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  }

})