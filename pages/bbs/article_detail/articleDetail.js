// pages/bbs/article_detail/articleDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }],
    article:{
      title:"在成都一定要做的50件小事，每一件都值得",
      content:"<h1>hahahaha</h1>",
    },
    comment_textarea:0,
    focus:false,
    input_val:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getTextarea(e){
    
    var comment_textarea = this.data.comment_textarea == 1 ? 0:1;
    this.setData({
      focus:true,
      comment_textarea: comment_textarea
    })    

  },
  closeCommentBox(e){
    var comment_textarea = this.data.comment_textarea == 1 ? 0 : 1;
    this.setData({
      comment_textarea: comment_textarea
    })    

  },
  hideKeyboard(e){
    var input_val = e.detail.value
    this.setData({
      comment_textarea: 0,
      input_val: input_val
    })  
  },
  postComment:function(e){
    console.log(e)
  }

})