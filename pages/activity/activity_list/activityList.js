import api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [],
    page: 1,
    last_page: 0,
    sort: 0,
    cate_id:0,
    time_sort:0,
    activityCates: [{
      id: 0,
      name: "全部",
    }],
    a_index: 0, 
    kword:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var kword = options.kword
    var cate_id = options.cate_id
    this.setData({
      kword: kword == undefined ? "" : kword,
      cate_id: cate_id  == undefined ? 0:cate_id
    })


    var that = this
    api.activityCates().then(data => {
      var arr1 = that.data.activityCates; //从data获取当前datalist数组
      var arr2 = data
      arr1 = arr1.concat(arr2); //合并数组
      this.setData({
        activityCates: arr1
      })
      if(cate_id != 0 && cate_id != undefined){
          for(var i = 0;i<arr1.length;i++){
            if(arr1[i].id == cate_id){
              this.setData({
                a_index: i
              })
            }
          }
      }
    })
    api.activityList(this.data.page, this.data.cate_id, this.data.time_sort,kword).then(data => {
      console.log(data)
      this.setData({
        last_page: data.last_page,
        activityList: data.activities
      })
    })
  },

 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.last_page == this.data.page) {
      return
    }
    this.setData({
      page: this.data.page + 1
    })
    api.activityList(this.data.page, this.data.cate_id, this.data.time_sort,this.data.kword).then(data => {

      var that = this;

      var arr1 = that.data.activityList; //从data获取当前datalist数组
      var arr2 = data.activities
      arr1 = arr1.concat(arr2); //合并数组
      that.setData({
        activityList: arr1 //合并后更新datalist
      })
    })
  },
  bindPickerChange(e){
    console.log(e)
    var a_index = e.detail.value


    api.activityList(1, this.data.activityCates[a_index].id, 0,this.data.kword).then(data => {
      this.setData({
        page: 1,
        last_page: data.last_page,
        activityList: data.activities
      })
    })
    this.setData({
      a_index: a_index,
      cate_id: this.data.activityCates[a_index].id
    })
  },
  tabSelect(e) {
    console.log(e)
    var sort = e.currentTarget.dataset.sort
    var time_sort = e.currentTarget.dataset.timeSort
    this.setData({
      sort: sort,
    })
    if (sort != 0){

      time_sort = time_sort == 1 ? 0 : 1
      api.activityList(1, this.data.cate_id, time_sort, this.data.kword).then(data => {
        console.log(data)
        this.setData({
          page:1,
          last_page: data.last_page,
          activityList: data.activities,
          time_sort: time_sort
        })
      })
    }
  }

})