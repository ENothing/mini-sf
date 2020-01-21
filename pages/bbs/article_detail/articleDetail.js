// pages/bbs/article_detail/articleDetail.js
import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiperList: [{
    //   id: 0,
    //   type: 'image',
    //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    // }],
    comment_textarea:0,
    focus:false,
    input_val:"",
    id: "",
    article_detail:"",
    commentList:"",
    last_page:0,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    console.log(id)


    api.articleDetail(id).then(data => {
      this.setData({
        article_detail: data
      })
    })

    api.articleCommentList(id).then(data => {
      if(data != ""){
        this.setData({
          commentList: data.articleComments,
          total: data.total,
          last_page: data.last_page,
        })
        console.log(data)
        console.log(data.articleComments)
      }
    })

    this.setData({
      id: id
    })
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