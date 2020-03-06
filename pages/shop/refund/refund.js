// pages/shop/refund/refund.js
import http from '../../../utils/http.js'
import api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rTypeArr: [{
        type: 1,
        text: "仅退款",
      },
      {
        type: 2,
        text: "退款退货",
      },
    ],
    r_index: 0, 
    order_id: 0,
    imgList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var order_id = options.order_id
    this.setData({
      order_id: order_id
    })
  },
  bindPickerChange(e) {
    this.setData({
      r_index: e.detail.value
    })
  },
  formSubmit: function(e) {
    var order_id = this.data.order_id
    var r_type = e.detail.value.rtype
    var reason = e.detail.value.reason
    var imgs = this.data.imgList
    if (reason == "" || reason == undefined) {
      wx.showToast({
        icon: "none",
        title: "申请原因不能为空哦~"
      })
      return 
    }
    api.initiateRefund(order_id, reason, r_type, imgs).then(data => {

      wx.showToast({
        icon: "none",
        title: "申请退款成功，等待审批",
        duration: 1000,
        success: function () {
          wx.navigateBack({
            delta: 1
          })
        }
      })
      console.log(data)
    })

  },
  ChooseImage() {
    var token = wx.getStorageSync('token')

    wx.chooseImage({
      count: 3, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var imgUrl = res.tempFilePaths[i];
          wx.uploadFile({
            url: http.apiUrl + '/shop/upload',
            filePath: imgUrl,
            name: 'file',
            header: {
              token: token,
            },
            success: (res) => {
              var jsonStr = res.data;
              var obj = JSON.parse(jsonStr);
              if (res.statusCode == 200) {
                if (obj.code == 0) {
                  this.setData({
                    imgList: this.data.imgList.concat(obj.data)
                  })
                } else {
                  wx.showToast({
                    icon: "none",
                    title: obj.message
                  })
                }
              } else {
                wx.showToast({
                  icon: "none",
                  title: obj.message,
                })
              }
            },
            fail: function(e) {
              wx.showToast({
                icon: "none",
                title: "网络错误，请重试"
              })
              return
            }
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgList: this.data.imgList
    })
  },
})