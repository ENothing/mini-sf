// pages/shop/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1878991123,2355764567&fm=26&gp=0.jpg'
    }, {
      id: 0,
      type: 'image',
      url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1878991123,2355764567&fm=26&gp=0.jpg'
    }],
    goods: {
      goods_thumb: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1878991123,2355764567&fm=26&gp=0.jpg',
      low_price: "185",
      sizes: [{
        id: 1,
        name: 'S',
        now_price: '123'
      }, {
        id: 2,
        name: 'L',
        now_price: '312'
      }, {
        id: 3,
        name: 'L',
        now_price: '312'
      }, {
        id: 4,
        name: 'L',
        now_price: '312'
      }, {
        id: 5,
        name: 'L',
        now_price: '312'
      }, {
        id: 6,
        name: 'L',
        now_price: '312'
      }, {
        id: 7,
        name: 'L',
        now_price: '312'
      }, {
        id: 8,
        name: 'L',
        now_price: '312'
      }, {
        id: 9,
        name: 'L',
        now_price: '312'
      }]
    },






    modalName: null,
    modalButton: null,
    choose_key: null,
    choose_name: null

  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      modalButton: null
    })
  },
  showButtonModal(e) {
    var id = e.currentTarget.dataset.id

    if (this.data.choose_key == id) {
      this.setData({
        modalButton: null,
        choose_key: null,
        choose_name: null,
      })
    }else{
      this.setData({
        modalButton: e.currentTarget.dataset.target,
        choose_key: id,
        choose_name: e.currentTarget.dataset.name,
      })
    }

  },

  goToOrder(e){
      wx.navigateTo({
          url: '/pages/shop/order/order?id=' + this.data.choose_key,
      })
  },


  onReady() {
    wx.hideLoading()
  },


})