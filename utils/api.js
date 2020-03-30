import {
  http
} from '../utils/http.js'

var url = {

//user
  userLogin: "/user/login",
  userInfo: "/user/info",
  per_collect:"/user/per_collect",
  feedback: "/user/feedback",
  followList:"/user/follow_list",
  followedList: "/user/followed_list",
  myArticle:"/user/article",
//activity
  activityIndex: "/activity/index",
  activityCates: "/activity/cates",

  activityList: "/activity/list",
  activityDetail: "/activity/detail",
  activityEnter:"/activity/enter",
  activityOrderDetail:"/activity/order",

  activitySearchHistory: "/activity/search_history",
  activityDynamicHistory: "/activity/dynamic_history",
  delactivitySearchHistory: "/activity/del_search_history",

  activityInitiateRefund: "/activity/initiate_refund",
  activityFinish: "/activity/finish",
  activityOrderList:"/activity/order_list",
  
//bbs
  articleList: "/bbs/list",
  articleDetail: "/bbs/detail",
  articleCommentList: "/bbs/comment_list",
  articleCate:"/bbs/article_cate",
  articlePublish:"/bbs/publish_article",
  articlelike: "/bbs/like",
  editArticleDetail:"/bbs/edit_article_detail",
  editArticle: "/bbs/edit_article",
  delArticle:"/bbs/del_article",
  publishArticle:"/bbs/publish",


  articleCommentPost: "/bbs/post_comment",
  userArticles: "/bbs/user_articles",
  userDetail: "/bbs/user_detail",
  userLikeArticles: "/bbs/user_like_articles",
  userFollows: "/bbs/follow",
  bbsFollowsList:"/bbs/follows_List",
  bbsFollowedList: "/bbs/followed_List",

//shop
  shopIndex: "/shop/index",
  shopGoodsList: "/shop/list",
  shopOrderList:"/shop/order_list",

  catesWithBrands: "/shop/cates_with_brands",


  shopGoodsDetail: "/shop/goods_detail",
  preOrderDetail: "/shop/pre_order_detail",
  shopBuy:"/shop/buy",
  shopOrderDetail:"/shop/order_detail",
  initiateRefund:"/shop/initiate_refund",
  shopReturnInfo: "/shop/post_return_info",

  addressList: "/address/list",
  updateDefaultAddress:"/address/update_default",
  addressDetail:"/address/detail",
  addAddress:"/address/add",
  updateAddress:"/address/update",
  delAddress:"/address/del",
  detailToOrder: "/address/detail_to_order",

  userCoupons: "/coupon/user_coupons",


  shopSearchHistory: "/shop/search_history",
  shopDynamicHistory: "/shop/dynamic_history",



  delShopSearchHistory: "/shop/del_search_history",



}

var base_token = wx.getStorageSync('token')


module.exports = {
  
//user
  userLogin(code, iv, encryptedData) {
    return http({
      url: url.userLogin,
      method: "POST",
      data: {
        code: code,
        iv: iv,
        encryptedData: encryptedData
      }
    })
  },
  userInfo(token){
    return http({
      url: url.userInfo,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + token
      },
      method: "GET",
    })
  },
  per_collect(data){
    return http({
      url: url.per_collect,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      method: "GET",
      data: {
        page: data.page,
      }
    })
  },
  feedback(data){
    return http({
      url: url.feedback,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      method: "POST",
      data: {
        title: data.title,
        content: data.content,
        pics: data.imgList,
      }
    })
  },
  followList(data){
    return http({
      url: url.followList,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      method: "GET",
      data: {
        page: data.page,
      }
    })
  },
  followedList(data) {
    return http({
      url: url.followedList,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      method: "GET",
      data: {
        page: data.page,
      }
    })
  },
  myArticle(data){
    return http({
      url: url.myArticle,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      method: "GET",
      data: {
        page: data.page,
      }
    })
  },

//activity
  activityIndex() {
    return http({
      url: url.activityIndex,
      method: "GET"
    })
  },
  activityCates(){
    return http({
      url: url.activityCates,
      method: "GET"
    })
  },
  activityList(data) {
    return http({
      url: url.activityList,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      method: "GET",
      data: {
        page: data.page,
        cate_id: data.cateId,
        sort: data.sort,
        title: data.kword == undefined ? "" : data.kword,
      }
    })
  },
  activityDetail(id) {
    return http({
      url: url.activityDetail + "/" + id,
      method: "GET"
    })
  },
  activityEnter(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.activityEnter,
      method: "POST",
      data: {
        id: data.id,
        name: data.name == undefined ? "" : data.name,
        gender: data.sex,
        c_type: data.c_type,
        c_num: data.c_num == undefined ? "" : data.c_num,
        mobile: data.mobile == undefined ? "" : data.mobile,
        sms_code: data.code == undefined ? "" : data.code ,
        person_num: data.person_num == undefined ? 1 : data.person_num ,

      }
    })
  },
  activityOrderDetail(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.activityOrderDetail + "/" + data.id,
      method: "GET"
    })
  },



  activitySearchHistory(token) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + token
      },
      url: url.activitySearchHistory,
      method: "GET",
    })
  },

  activityDynamicHistory(kword) {
    return http({
      url: url.activityDynamicHistory,
      method: "GET",
      data: {
        kword: kword,
      }
    })
  },
  delactivitySearchHistory(token) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + token
      },
      url: url.delactivitySearchHistory,
      method: "GET",
    })
  },

  activityInitiateRefund(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.activityInitiateRefund,
      method: "POST",
      data: {
        order_id: data.order_id,
        reason: data.reason,
      }
    })
  },
  activityFinish(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.activityFinish + "/" + data.id ,
      method: "GET",
    })
  },
  activityOrderList(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.activityOrderList,
      method: "GET",
      data: {
        page: data.page,
        status: data.status == undefined ? 0 : data.status,
      }
    })
  },

//bbs
  articleList(data) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.articleList + "?page=" + data.page,
      method: "GET"
    })
  },
  articleDetail(data) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.articleDetail + "/" + data.id,
      method: "GET"
    })
  },
  articleCate(){
    return http({
      url: url.articleCate,
      method: "GET"
    })
  },
  articleCommentList(data) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.articleCommentList,
      method: "GET",
      data: {
        page: data.page,
        article_id: data.id
      }
    })
  },
  articlePublish(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.articlePublish,
      method: "POST",
      data: {
        thumb: data.imgList[0],
        content: data.content,
        cate_id: data.cate_id,
        title: data.title
      }
    })
  },
  editArticleDetail(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.editArticleDetail + '/' + data.id,
      method: "GET",
    })
  },
  editArticle(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.editArticle+'/'+data.id,
      method: "POST",
      data: {
        thumb: data.imgList[0],
        content: data.content,
        cate_id: data.cate_id,
        title: data.title,
        is_publish: data.is_publish,

      }
    })
  },
  delArticle(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.delArticle + '/' + data.id,
      method: "GET",
    })
  },
  publishArticle(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.publishArticle + '/' + data.id,
      method: "GET",
    })
  },
  articlelike(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.articlelike+"/"+data.id,
      method: "GET",
    })
  },
  articleCommentPost(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.articleCommentPost,
      method: "POST",
      data: {
        id: data.id,
        parent_id: data.parent_id,
        reply_id: data.reply_id,
        content: data.content
      }
    })
  },
  userArticles(id,page) {
    return http({
      url: url.userArticles + '/' + id,
      method: "GET",
      data: {
        page: page,
      }
    })
  },
  userDetail(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.userDetail+'/'+data.id,
      method: "GET",
    })
  },
  userLikeArticles(id, page){
    return http({
      url: url.userLikeArticles + '/' + id,
      method: "GET",
      data: {
        page: page,
      }
    })
  },
  userFollows(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.userFollows + '/' + data.follow_id,
      method: "GET",
    })
  },
  bbsFollowsList(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.bbsFollowsList + '/' + data.id,
      method: "GET",
      data: {
        page: data.page,
      }
    })
  },
  bbsFollowedList(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.bbsFollowedList + '/' + data.id,
      method: "GET",
      data: {
        page: data.page,
      }
    })
  },
//shop
  shopIndex() {
    return http({
      url: url.shopIndex,
      method: "GET"
    })
  },
  shopGoodsList(data) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.shopGoodsList,
      method: "GET",
      data: {
        page: data.page,
        cate_id: data.cate_id == undefined ? 0 : data.cate_id,
        brand_id: data.brand_id == undefined ? 0 : data.brand_id,
        kword: data.kword == undefined ? "" : data.kword,
        sort: data.sort == undefined ? 0 : data.sort,
        sort_type: data.sort_type == undefined ? 1 : data.sort_type,
      }
    })
  },
  shopOrderList(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.shopOrderList,
      method: "GET",
      data: {
        page: data.page,
        status: data.status == undefined ? 0 : data.status,
      }
    })
  },
  initiateRefund(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.initiateRefund,
      method: "POST",
      data: {
        order_id: data.order_id,
        reason: data.reason,
        r_type: data.r_type,
        reason_pics: data.imgs
      }
    })
  },
  shopReturnInfo(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.shopReturnInfo,
      method: "POST",
      data: {
        refund_id: data.refund_id,
        express_n: data.express_n,
        express_id: data.express_id,
      }
    })
  },




  catesWithBrands() {
    return http({
      url: url.catesWithBrands,
      method: "GET"
    })
  },




  shopGoodsDetail(id) {
    return http({
      url: url.shopGoodsDetail + "/" + id,
      method: "GET"
    })
  },


  addressList(token) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + token
      },
      url: url.addressList,
      method: "GET"
    })
  },
  updateDefaultAddress(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.updateDefaultAddress+"/"+data.id,
      method: "GET"
    })
  },
  addressDetail(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.addressDetail + "/" + data.id,
      method: "GET"
    })
  },
  addAddress(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.addAddress,
      method: "POST",
      data: {
        name: data.name,
        mobile: data.mobile,
        province: data.rovince,
        city: data.city,
        district: data.district,
        detail_address: data.detail_address
      }
    })
  },
  updateAddress(data) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.updateAddress + "/" + data.id,
      method: "POST",
      data: {
        name: data.name,
        mobile: data.mobile,
        province: data.province,
        city: data.city,
        district: data.district,
        detail_address: data.detail_address
      }
    })
  },
  delAddress(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.delAddress + "/" + data.id,
      method: "GET",
    })
  },
  detailToOrder(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.detailToOrder,
      method: "GET",
      data: {
        id: data.id == undefined ? 0 : data.id,
      }
    })
  },






  preOrderDetail(id, token) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + token
      },
      url: url.preOrderDetail + "/" + id,
      method: "GET"
    })
  },
  shopBuy(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.shopBuy,
      method: "POST",
      data: {
        num: data.num,
        goods_spu_id: data.goodsSpuId,
        address_id: data.addressId,
        coupon_id: data.couponId,
        goods_id: data.goodsId
      }
    })
  },
  shopOrderDetail(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.shopOrderDetail + "/" + data.id,
      method: "GET"
    })
  },




  userCoupons(data) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + data.token
      },
      url: url.userCoupons,
      method: "GET",
      data: {
        status: data.status,
        page: data.page
      }
    })
  },



  shopSearchHistory(token) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + token
      },
      url: url.shopSearchHistory,
      method: "GET",
    })
  },

  shopDynamicHistory(kword) {
    return http({
      url: url.shopDynamicHistory,
      method: "GET",
      data: {
        kword: kword,
      }
    })
  },

  delShopSearchHistory(token) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + token
      },
      url: url.delShopSearchHistory,
      method: "GET",
    })
  }


}