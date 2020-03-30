import api from '../../../utils/api.js'

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    gridCol: 4,
    skin: false,
    goods_cates: "",
    shop_banners: "",
    goodsList: "",
    page: 1,
    last_page: 1,
    token: ""
  },
  attached() {
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })

    api.shopIndex().then(data => {
      this.setData({
        shop_banners: data.shop_banners,
        goods_cates: data.goods_cates
      })
    })

    api.shopGoodsList({
      token: token,
      page: this.data.page,
      cate_id: 0,
      brand_id: 0,
      kword: "",
      sort: 0,
      sort_type: 1
    }).then(data => {
      this.setData({
        goodsList: data.goods,
        last_page: data.last_page
      })
    })





    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  methods: {
    goToGoodslist(e) {
      var cate_id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/shop/goods_list/goodsList?cate_id=' + cate_id,
      })

    },
    getList() {
      if (this.data.last_page == this.data.page) {
        return
      }
      this.setData({
        page: this.data.page + 1
      })
      api.shopGoodsList(
        {
          token: this.data.token,
          page: this.data.page,
          cate_id: 0,
          brand_id: 0,
          kword: "",
          sort: 0,
          sort_type: 1
        }
      ).then(data => {
        var that = this;
        var arr1 = that.data.goodsList; //从data获取当前datalist数组
        var arr2 = data.goods
        arr1 = arr1.concat(arr2); //合并数组
        that.setData({
          goodsList: arr1 //合并后更新datalist
        })
      })
    },
    GoToGoodsDetail: function (res) {
      var id = res.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/shop/detail/detail?id=' + id,
      })

    },
    goToAllCategory: function () {

      wx.navigateTo({
        url: '/pages/shop/detail/detail',
      })

    }


  }
})