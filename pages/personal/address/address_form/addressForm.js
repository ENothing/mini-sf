import api from '../../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    region: ['四川省', '成都市', '锦江区'],
    address:"",
    name:"",
    mobile:"",
    detail_address:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    if(id != undefined){
      api.addressDetail(id).then(data => {
        console.log(data)
        this.setData({
          id: options.id,
          name:data.name,
          mobile:data.mobile,
          detail_address:data.detail_address,
          region: [data.province, data.city, data.district]
        })

      })
    }
  },

  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },




})