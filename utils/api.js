import {
  http
} from '../utils/http.js'

var url = {

  userLogin: "/user/login",
  userInfo: "/user/info",
  per_collect:"/user/per_collect",
  feedback: "/user/feedback",



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
  

  articleList: "/bbs/list",
  articleDetail: "/bbs/detail",
  articleCommentList: "/bbs/comment_list",
  articleCate:"/bbs/article_cate",
  articlePublish:"/bbs/publish_article",
  articlelike: "/bbs/like",


  articleCommentPost: "/bbs/post_comment",

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
  userInfo(){
    return http({
      url: url.userInfo,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      method: "GET",
    })
  },
  per_collect(page){
    return http({
      url: url.per_collect,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      method: "GET",
      data: {
        page: page,
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
  activityList(page,cateId,sort,kword) {
    return http({
      url: url.activityList,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      method: "GET",
      data: {
        page: page,
        cate_id: cateId,
        sort: sort,
        title: kword == undefined ? "" : kword,
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
        "Authorization": "Bearer " + base_token
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
  activityOrderDetail(id){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.activityOrderDetail + "/" + id,
      method: "GET"
    })
  },



  activitySearchHistory() {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.activitySearchHistory,
      method: "GET",
    })
  },

  activityDynamicHistory(kword) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: url.activityDynamicHistory,
      method: "GET",
      data: {
        kword: kword,
      }
    })
  },
  delactivitySearchHistory() {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.delactivitySearchHistory,
      method: "GET",
    })
  },

  activityInitiateRefund(order_id, reason){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.activityInitiateRefund,
      method: "POST",
      data: {
        order_id: order_id,
        reason: reason,
      }
    })
  },
  activityFinish(id){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.activityFinish + "/" + id ,
      method: "GET",
    })
  },
  activityOrderList(page,status){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.activityOrderList,
      method: "GET",
      data: {
        page: page,
        status: status == undefined ? 0 : status,
      }
    })
  },


  articleList(page) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.articleList + "?page=" + page,
      method: "GET"
    })
  },
  articleDetail(id) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.articleDetail + "/" + id,
      method: "GET"
    })
  },
  articleCate(){
    return http({
      url: url.articleCate,
      method: "GET"
    })
  },
  articleCommentList(id,page) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.articleCommentList,
      method: "GET",
      data: {
        page: page,
        article_id:id
      }
    })
  },
  articlePublish(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
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
  articlelike(id){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.articlelike+"/"+id,
      method: "GET",
    })
  },




  articleCommentPost(data){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
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


  shopIndex() {
    return http({
      url: url.shopIndex,
      method: "GET"
    })
  },
  shopGoodsList(page, cate_id, brand_id, kword, sort, sort_type) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.shopGoodsList,
      method: "GET",
      data: {
        page: page,
        cate_id: cate_id == undefined ? 0:cate_id,
        brand_id: brand_id == undefined ? 0 : brand_id,
        kword: kword==undefined ? "":kword,
        sort: sort == undefined ? 0 : sort,
        sort_type: sort_type == undefined ? 1 : sort_type,
      }
    })
  },
  shopOrderList(page,status){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.shopOrderList,
      method: "GET",
      data: {
        page: page,
        status: status == undefined ? 0 : status,
      }
    })
  },
  initiateRefund(order_id, reason, r_type, imgs){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.initiateRefund,
      method: "POST",
      data: {
        order_id: order_id,
        reason: reason,
        r_type: r_type,
        reason_pics: imgs
      }
    })
  },
  shopReturnInfo(refund_id, express_n, express_id){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.shopReturnInfo,
      method: "POST",
      data: {
        refund_id: refund_id,
        express_n: express_n,
        express_id: express_id,
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


  addressList() {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.addressList,
      method: "GET"
    })
  },
  updateDefaultAddress(id){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.updateDefaultAddress+"/"+id,
      method: "GET"
    })
  },
  addressDetail(id){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.addressDetail + "/" + id,
      method: "GET"
    })
  },
  addAddress(name, mobile, province, city, district, detail_address){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.addAddress,
      method: "POST",
      data: {
        name: name,
        mobile: mobile,
        province: province,
        city: city,
        district: district,
        detail_address: detail_address
      }
    })
  },
  updateAddress(id, name, mobile, province, city, district, detail_address) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.updateAddress+"/"+id,
      method: "POST",
      data: {
        name: name,
        mobile: mobile,
        province: province,
        city: city,
        district: district,
        detail_address: detail_address
      }
    })
  },
  delAddress(id){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.delAddress + "/" + id,
      method: "GET",
    })
  },
  detailToOrder(id){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.detailToOrder,
      method: "GET",
      data: {
        id: id == undefined ? 0 : id,
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
  shopBuy(num, goodsSpuId, goodsId, addressId, couponId){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.shopBuy,
      method: "POST",
      data: {
        num: num,
        goods_spu_id: goodsSpuId,
        address_id: addressId,
        coupon_id: couponId,
        goods_id: goodsId
      }
    })
  },
  shopOrderDetail(id){
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.shopOrderDetail + "/" + id,
      method: "GET"
    })
  },




  userCoupons(status, page) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.userCoupons,
      method: "GET",
      data: {
        status: status,
        page: page
      }
    })
  },



  shopSearchHistory() {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.shopSearchHistory,
      method: "GET",
    })
  },

  shopDynamicHistory(kword) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: url.shopDynamicHistory,
      method: "GET",
      data: {
        kword: kword,
      }
    })
  },

  delShopSearchHistory() {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.delShopSearchHistory,
      method: "GET",
    })
  }


}