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
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    // context.setFillStyle("#fff")
    context.setFillStyle('black')
    context.fillRect(0, 0, 375, 667)
    var path = "http://soulfire-media.ericnothing.cn/images/O1CN01LaHvrD1WgghA9wisT_!!0-item_pic.jpg_180x180.jpg";
    context.drawImage(path, 1, 1, 1, 1);
    var path5 = "/images/qrcode.jpg";
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