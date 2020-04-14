// pages/activity/enter/enter.js
import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    activity: "",
    countDownNum: 60,
    picker: ['居民身份证', '护照'],
    index: null,
    mobile: "",
    token: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    var token = wx.getStorageSync('token')
    api.activityDetail(id).then(data => {
      this.setData({
        activity: data,
      })

    })
    this.setData({
      id: id,
      token: token
    })
  },
  onShow: function() {
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })

  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  goToOrder(e) {
    wx.navigateTo({
      url: '/pages/activity/activity_list/activityList?kword=' + kword,
    })
  },
  enterSubmit(e) {
    var protocol = e.detail.value.protocol
    var name = e.detail.value.name
    var mobile = e.detail.value.mobile
    var c_type = e.detail.value.c_type
    var c_num = e.detail.value.c_num
    var code = e.detail.value.code
    var sex = e.detail.value.sex

    console.log(e)
    if (name == "") {
      wx.showToast({
        icon: "none",
        title: "请填写姓名哦~",
      })
      return;
    }

    if (c_type == null) {
      wx.showToast({
        icon: "none",
        title: "请选择证件类型哦~",
      })
      return;
    }
    if (c_num == "") {
      wx.showToast({
        icon: "none",
        title: "请填写证件号码哦~",
      })
      return;
    }
    if (mobile == "") {
      wx.showToast({
        icon: "none",
        title: "请填写手机号码哦~",
      })
      return;
    }
    if (code == "") {
      wx.showToast({
        icon: "none",
        title: "请填写收到的验证码哦~",
      })
      return;
    }
    if (protocol.length != 1) {
      wx.showToast({
        icon: "none",
        title: "请先同意协议哦~",
      })
      return;
    }
    var data = {
      id: this.data.id,
      name: name,
      mobile: mobile,
      c_type: c_type,
      c_num: c_num,
      code: code,
      sex: sex,
      token: this.data.token
    }
    api.activityEnter(data).then(resData => {
      wx.navigateTo({
        url: '/pages/activity/pay_result/payResult?order_id=' + resData,
      })
    })

  },
  bindMobileInput(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  sendSmS() {
    var mobile = this.data.mobile
    var mobileReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!mobileReg.test(mobile)) {
      wx.showToast({
        icon: "none",
        title: "手机号有误哦~",
      })
      return;
    }
    if (this.data.countDownNum == 60) {
      api.activitySendSms({
        mobile: mobile,
        token: this.data.token
      }).then(res => {
        this.countDown();
        wx.showToast({
          icon: "none",
          title: "验证码发送成功~",
        })
      })
    }
  },
  countDown: function() {

    let that = this;
    let countDownNum = that.data.countDownNum;

    that.setData({
      timer: setInterval(function() {

        countDownNum--;

        that.setData({
          countDownNum: countDownNum
        })

        if (countDownNum == 0) {


          clearInterval(that.data.timer);


          that.setData({
            countDownNum: 60
          })
        }
      }, 1000)
    })
  }

})