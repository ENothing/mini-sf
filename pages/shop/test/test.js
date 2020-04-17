// pages/shop/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {







    this.createNImg()

  },

  createNImg() {

    // var path = "http://soulfire-media.ericnothing.cn/images/O1CN01LaHvrD1WgghA9wisT_!!0-item_pic.jpg_180x180.jpg";
    // var path = "https://pic.ibaotu.com/homeSp/20200414/5e957a34660b7.jpg"
    var path = "http://img0.imgtn.bdimg.com/it/u=3841322606,2022499346&fm=26&gp=0.jpg"
    // var path = "/images/thumb.jpg"
    var logo = "/images/logo.jpg"
    var path5 = "/images/qrcode.jpg";

    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#fff")
    context.fillRect(0, 0, 375, 667)


    wx.getImageInfo({
      src: path,
      success(re) {
        console.log(re)
        context.drawImage(re.path, 15, 100, 350, 350);
      },

    })



    






    context.drawImage(logo, 0, 0, 20, 20);
    var name = "123";

    //绘制左下角文字
    context.setFontSize(14);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("长按识别小程序", 70, 560);
    context.stroke();
    context.setFontSize(14);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("跟我一起来学习吧~~", 70, 580);
    context.stroke();

    //绘制右下角小程序二维码
    context.drawImage(path5, 230, 530, 80, 80);

    context.draw();
    //将生成好的图片保存到本地
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },

})