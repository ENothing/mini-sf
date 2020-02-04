// pages/shop/goods_list/goodsList.js
import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: null,
    last_page: 1,
    page: 1,
    updown: 0,
    cate_id: 0,
    brand_id: 0,
    name: "",
    sort: 0,
    sort_type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    api.shopGoodsList(
      this.data.page, 
      this.data.cate_id, 
      this.data.brand_id, 
      this.data.name, 
      this.data.sort, 
      this.data.sort_type
      ).then(data => {
      console.log(data)
      this.setData({
        goodsList: data.goods,
        last_page: data.last_page
      })
    })





  },
  onReachBottom: function() {

    if (this.data.last_page == this.data.page) {
      return
    }
    this.setData({
      page: this.data.page + 1
    })
    var that = this;

    api.shopGoodsList(
      this.data.page, 
      this.data.cate_id, 
      this.data.brand_id, 
      this.data.name, 
      this.data.sort, 
      this.data.sort_type
      ).then(data => {
      var arr1 = that.data.goodsList;
      var arr2 = data.goods
      arr1 = arr1.concat(arr2); 
      that.setData({
        goodsList: arr1 
      })
    })
  },
  GoToGoodsDetail: function(res) {
    console.log(res);
    var id = res.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shop/detail/detail',
    })
  },
  tabSelect(e) {
    console.log(e)
    var sort_type = e.currentTarget.dataset.sortType
    var updown = e.currentTarget.dataset.updown
    this.setData({
      sort_type: sort_type,
    })
    if (sort_type == 2) {
      this.setData({
        updown: updown == 0 ? 1 : 0,
      })
    }else{
      this.setData({
        updown: 0,
      })
    }
    api.shopGoodsList(
      1,
      this.data.cate_id,
      this.data.brand_id,
      this.data.name,
      this.data.sort,
      sort_type
    ).then(data => {
      this.setData({
        goodsList: data.goods,
        sort:this.data.sort == 0?1:0,
        page:1,
        last_page: data.last_page
      })
    })
  }
})