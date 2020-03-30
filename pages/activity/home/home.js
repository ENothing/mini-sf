import api from '../../../utils/api.js'

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    swiperList: [],
    msgList: [],
    activityList: [],
    iconList:"",
    video_url: "",
    page:1,
    last_page:0,
    skin: false,
    token:""
  },
  attached() {
    var token = wx.getStorageSync('token')
    this.setData({
      token:token
    })
    api.activityIndex().then(data=>{ 
      this.setData({
        swiperList: data.activity_banners,
        msgList: data.activity_ann,
        video_url: data.activity_video.video_url,
        iconList: data.activity_cates
      })
    })


    var obj = {
      page: 1,
      cate_id: 0,
      sort: 0,
      title: "",
      token:token
    }

    api.activityList(obj).then(data => {
      this.setData({
        last_page: data.last_page,
        activityList: data.activities
      })

    })

    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  methods: {
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },


    getList(){

      if (this.data.last_page == this.data.page){
        return
      }
      this.setData({
        page:this.data.page+1
      })
      var obj = {
        page: this.data.page,
        cate_id: 0,
        sort: 0,
        title: "",
        token:token
      }
      api.activityList(obj).then(data => {

        var that = this;

        var arr1 = that.data.activityList; //从data获取当前datalist数组
        var arr2 = data.activities
        arr1 = arr1.concat(arr2); //合并数组
        that.setData({
          activityList: arr1 //合并后更新datalist
        })
      })
    },

    goToActivityCates(){
      wx.navigateTo({
        url: '/pages/activity/category/category'
      })
    },
    goToSearch() {
      wx.navigateTo({
        url: '/pages/activity/search/search'
      })
    },
    goToActivityList(e){
      var cate_id = e.currentTarget.dataset.id
      console.log(e)
      wx.navigateTo({
        url: '/pages/activity/activity_list/activityList?cate_id=' + cate_id,
      }) 
    }
  },

})