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
    comment_textarea: 0,
    focus: false,
    input_val: "",
    id: 0,
    article_detail: "",
    commentList: "",
    last_page: 0,
    total: 0,
    page: 1,
    parent_id: 0,
    reply_id: 0,
    placeholder:"说点什么...",
    icon:"cuIcon-write",
    liked:false,
    likes:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    console.log(id)


    api.articleDetail(id).then(data => {
      console.log(data)
      this.setData({
        article_detail: data,
        liked: data.liked,
        likes: data.likes
      })
    })

    api.articleCommentList(id, this.data.page).then(data => {
      if (data != "") {
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
  getTextarea(e) {

    var comment_textarea = this.data.comment_textarea == 1 ? 0 : 1;
    this.setData({
      focus: true,
      comment_textarea: comment_textarea
    })

  },
  closeCommentBox(e) {
    var comment_textarea = this.data.comment_textarea == 1 ? 0 : 1;
    this.setData({
      comment_textarea: comment_textarea
    })

  },
  hideKeyboard(e) {
    var input_val = e.detail.value
    this.setData({
      comment_textarea: 0,
      input_val: input_val
    })
  },
  postComment: function(e) {
    var content = e.detail.value.comment
    var id = this.data.id
    var parent_id = this.data.parent_id
    var reply_id = this.data.reply_id


    if (content == "" || content == undefined) {
      wx.showToast({
        icon: "none",
        title: "评论内容不能为空哦~"
      })
      return;
    }

    var data = {
      id,
      content,
      parent_id,
      reply_id
    }
    api.articleCommentPost(data).then(resData => {
      api.articleCommentList(id, 1).then(redata => {
        this.setData({
          commentList: redata.articleComments,
          total: redata.total,
          last_page: redata.last_page,
          page: 1,
        })
      })
    })
    this.setData({
      input_val: "",
      parent_id: 0,
      reply_id: 0,
      placeholder: "说点什么...",
      icon: "cuIcon-write"
    })

  },
  Reply(e){

    var id = e.currentTarget.dataset.id
    var reply_id = e.currentTarget.dataset.replyId
    this.setData({
      parent_id:id,
      reply_id: reply_id,
      comment_textarea:1,
      focus: true,
      placeholder: "@ "+e.currentTarget.dataset.username,
      icon:"cuIcon-roundclose"
    })

  },
  clearAt(){
    this.setData({
      parent_id: 0,
      reply_id: 0,
      placeholder: "说点什么...",
      icon: "cuIcon-write"
    })
  },
  likeAndUnlike(){



    api.articlelike(this.data.id).then(data => {

      if (!this.data.liked) {
        wx.showToast({
          icon: "none",
          title: "不喜欢！",
        })
      } else {
        wx.showToast({
          icon: "none",
          title: "喜欢！",
        })
      }

    })

    this.setData({
      liked:this.data.liked == false ? true:false,
      likes:this.data.liked == false ? this.data.likes +1:this.data.likes -1 
    })

  }

})