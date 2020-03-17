// pages/activity/enter/enter.js
import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    activity: "",
    countDownNum: 60

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    console.log(id)
    api.activityDetail(id).then(data => {
      console.log(data)
      this.setData({
        activity: data
      })

    })
    this.setData({
      id: id
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
    var idcard = e.detail.value.idcard
    var code = e.detail.value.code
    var sex = e.detail.value.sex

    if(name == ""){
      wx.showToast({
        icon: "none",
        title: "请填写姓名哦~",
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
    if (idcard == "") {
      wx.showToast({
        icon: "none",
        title: "请填写身份证号码哦~",
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
      name:name,
      mobile: mobile,
      idcard: idcard,
      code: code,
      sex:sex
    }


    data = JSON.stringify(data)

    console.log(data)

    wx.navigateTo({
      url: '/pages/activity/order/order?id='+this.data.id+'&item=' + data,
    })
  },
  sendSmS() {
    if (this.data.countDownNum == 60) {
      this.countDown();
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