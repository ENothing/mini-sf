const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    imgList: [],
    textareaInput: '',
    title:''
  },


  ChooseImage() {
    wx.chooseImage({
      count: 5, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
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
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  title(e){
    this.setData({
      title: e.detail.value
    })
  },
  submit(){
    wx.showToast({
      title: '您的反馈及建议已发出~',
      icon: 'none',
      duration: 1000,//持续的时间
      success:(res)=>{
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        }, 1000)

      }
    })
  }
})