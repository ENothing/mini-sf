import http from '../../../utils/http.js'
import api from '../../../utils/api.js'

Page({
  data: {
    formats: {},
    readOnly: false,
    editorHeight: 400,
    keyboardHeight: 0,
    isIOS: false,
    picker: [],
    imgList: [],
    content: "",
    token: wx.getStorageSync('token'),
    id: 0,
    article: {},
    index: "",
  },
  onLoad(options) {
    var id = options.id == undefined ? 0 : options.id
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
    const that = this

    api.articleCate().then(data => {
      this.setData({
        picker: data
      })

    })

    if (id != 0) {
      api.editArticleDetail({token:token,id:id}).then(data => {
        var cates = that.data.picker
        for (var i in cates) {

          if (data.cate_id == cates[i].id) {
            this.setData({
              index: i,
            })
          }

        }
        this.setData({
          article: data,
          imgList: this.data.imgList.concat(data.thumb)
        })
      })
    }

    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({
      isIOS,
      id
    })
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  ChooseImage() {
    var token = wx.getStorageSync('token')
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var imgUrl = res.tempFilePaths[i];
          wx.uploadFile({
            url: http.apiUrl + '/bbs/upload',
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
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const {
      windowHeight,
      platform
    } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({
      editorHeight,
      keyboardHeight
    })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const {
      statusBarHeight,
      platform
    } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      if (that.data.id != 0) {
        that.editorCtx.setContents({
          html: that.data.article.content,
          fail: function () {
            wx.showToast({
              title: '富文本内容获取失败，请重试~',
              icon: '',
            })
          }
        })
        that.setData({
          content: that.data.article.content,
        })


      }
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 9,
      success: function (res) {
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var imgUrl = res.tempFilePaths[i];
          wx.uploadFile({
            url: http.apiUrl + '/bbs/upload',
            filePath: imgUrl,
            name: 'file',
            header: {
              token: that.data.token,
            },
            success: (res) => {
              var jsonStr = res.data;
              var obj = JSON.parse(jsonStr);
              if (res.statusCode == 200) {
                if (obj.code == 0) {
                  console.log(obj.data)
                  that.editorCtx.insertImage({
                    src: obj.data,
                    data: {
                      id: 'abcd',
                      role: 'god'
                    },
                    width: '80%',
                    success: function () {
                      console.log('insert image success')
                    }
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
    })
  },
  editorContent(e) {
    this.setData({
      content: e.detail.html
    })
  },
  formSubmit(e) {
    console.log(e)
    var data = {
      imgList: this.data.imgList,
      content: this.data.content,
      cate_id: e.detail.value.cate_id,
      title: e.detail.value.title,
      is_publish: e.detail.target.dataset.status,
      id: this.data.id,
      token:this.data.token
    }
    console.log(data)

    if (data.title == "") {
      wx.showToast({
        icon: "none",
        title: "标题不能为空哦~",
      })
      return;
    }
    if (data.cate_id == null) {
      wx.showToast({
        icon: "none",
        title: "加个分类哦~",
      })
      return;
    }
    if (data.imgList.length == 0) {
      wx.showToast({
        icon: "none",
        title: "一定要选择封面哦！",
      })
      return;
    }
    if (data.imgList.content == "") {
      wx.showToast({
        icon: "none",
        title: "创作不能为空哦~",
      })
      return;
    }
    if (data.status) {
      wx.showLoading({
        title: '文章上传中...',
      })
      api.editArticle(data).then(resData => {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        wx.showToast({
          icon: "none",
          title: "文章发布成功,等待审核~",
          duration: 1000,
          success: function () {
            wx.navigateTo({
              url: '/pages/personal/article/article',
            })
          }
        })
      })
    } else {
      wx.showLoading({
        title: '保存中',
      })
      api.editArticle(data).then(resData => {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        wx.showToast({
          icon: "none",
          title: "文章保存成功",
          duration: 1000,
          success: function () {
            wx.navigateTo({
              url: '/pages/personal/article/article',
            })
          }
        })
      })
    }



  }
})