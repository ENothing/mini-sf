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
    kword: "",
    sort: 0,
    sort_type: 1,
    token: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    var brand_id = options.brand_id
    var cate_id = options.cate_id
    var kword = options.kword
    this.setData({
      cate_id: cate_id,
      brand_id: brand_id,
      kword: kword,
      token: token
    })

    api.shopGoodsList(
      {
        token: token,
        page: this.data.page,
        cate_id: this.data.cate_id,
        brand_id: this.data.brand_id,
        kword: this.data.kword,
        sort: this.data.sort,
        sort_type: this.data.sort_type
      }
    ).then(data => {
      this.setData({
        goodsList: data.goods,
        last_page: data.last_page
      })
    })

  },
  onReachBottom: function () {

    if (this.data.last_page == this.data.page) {
      return
    }
    this.setData({
      page: this.data.page + 1
    })
    var that = this;

    api.shopGoodsList({
      token: that.data.token,
      page: this.data.page,
      cate_id: this.data.cate_id,
      brand_id: this.data.brand_id,
      kword: this.data.kword,
      sort: this.data.sort,
      sort_type: this.data.sort_type
    }).then(data => {
      var arr1 = that.data.goodsList;
      var arr2 = data.goods
      arr1 = arr1.concat(arr2);
      that.setData({
        goodsList: arr1
      })
    })
  },
  GoToGoodsDetail: function (res) {
    var id = res.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shop/detail/detail?id=' + id,
    })
  },
  tabSelect(e) {
    var sort_type = e.currentTarget.dataset.sortType
    var updown = e.currentTarget.dataset.updown
    this.setData({
      sort_type: sort_type,
    })
    if (sort_type == 2) {
      this.setData({
        updown: updown == 0 ? 1 : 0,
      })
    } else {
      this.setData({
        updown: 0,
      })
    }
    api.shopGoodsList({
      token: this.data.token,
      page: 1,
      cate_id: this.data.cate_id,
      brand_id: this.data.brand_id,
      kword: this.data.kword,
      sort: this.data.sort,
      sort_type: sort_type
    }).then(data => {
      this.setData({
        goodsList: data.goods,
        sort: this.data.sort == 0 ? 1 : 0,
        page: 1,
        last_page: data.last_page
      })
    })
  }
})