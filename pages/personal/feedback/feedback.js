import http from '../../../utils/http.js'
import api from '../../../utils/api.js'
Page({
  data: {
    imgList: [],
    token: ""
  },
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 3, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var imgUrl = res.tempFilePaths[i];
          wx.uploadFile({
            url: http.apiUrl + '/user/upload',
            filePath: imgUrl,
            name: 'file',
            header: {
              token: this.data.token,
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
            fail: function (e) {
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
  formSubmit(e) {

    var data = {
      title: e.detail.value.title,
      content: e.detail.value.content,
      imgList: JSON.stringify(this.data.imgList),
      token: this.data.token
    }
    api.feedback(data).then(resData => {

      wx.showToast({
        title: '您的反馈及建议已发出~',
        icon: 'none',
        duration: 1000, //持续的时间
        success: (res) => {
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)

        }
      })
    })






  }
})