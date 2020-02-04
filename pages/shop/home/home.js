import api from '../../../utils/api.js'

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    gridCol: 4,
    skin: false,
    goods_cates:"",
    shop_banners:"",
    goodsList:"",
    page:1,
    last_page:1,
  },
  attached() {

    api.shopIndex().then(data => {
      console.log(data)
      this.setData({
        shop_banners: data.shop_banners,
        goods_cates: data.goods_cates
      })
    })

    api.shopGoodsList(this.data.page).then(data => {
      console.log(data)
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
    getList() {
      if (this.data.last_page == this.data.page) {
        return
      }
      this.setData({
        page: this.data.page + 1
      })
      api.shopGoodsList(this.data.page).then(data => {

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
      console.log(res);
      var id = res.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/shop/detail/detail?id='+id,
      })

    },
    goToAllCategory:function(){

      wx.navigateTo({
        url: '/pages/shop/detail/detail',
      })

    }


  }
})