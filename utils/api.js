import {
  http
} from '../utils/http.js'

var url = {

  userLogin: "/user/login",





  activityIndex: "/activity/index",
  activityList: "/activity/list",
  activityDetail: "/activity/detail",

  articleList: "/bbs/list",
  articleDetail: "/bbs/detail",
  articleCommentList: "/bbs/comment_list",

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


  searchHistory: "/shop/search_history",
  dynamicHistory: "/shop/dynamic_history",



  delSearchHistory: "/shop/del_search_history",



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





  activityIndex() {
    return http({
      url: url.activityIndex,
      method: "GET"
    })
  },
  activityList(page) {
    return http({
      url: url.activityList + "?page=" + page,
      method: "GET"
    })
  },
  activityDetail(id) {
    return http({
      url: url.activityDetail + "/" + id,
      method: "GET"
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
  articleCommentList(id) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.articleCommentList + "?article_id=" + id,
      method: "GET"
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



  searchHistory() {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.searchHistory,
      method: "GET",
    })
  },

  dynamicHistory(kword) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: url.dynamicHistory,
      method: "GET",
      data: {
        kword: kword,
      }
    })
  },

  delSearchHistory() {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + base_token
      },
      url: url.delSearchHistory,
      method: "GET",
    })
  }


}