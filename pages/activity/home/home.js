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
  },
  attached() {

    api.activityIndex().then(data=>{ 
      console.log(data)
      this.setData({
        swiperList: data.activity_banners,
        msgList: data.activity_ann,
        video_url: data.activity_video.video_url,
        iconList: data.activity_cates
      })
    })




    api.activityList(this.data.page).then(data => {
      console.log(data)
      this.setData({
        last_page: data.last_page,
        activityList: data.activities
      })

    })

    console.log("activity")
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
      api.activityList(this.data.page).then(data => {

        var that = this;

        var arr1 = that.data.activityList; //从data获取当前datalist数组
        var arr2 = data.activities
        arr1 = arr1.concat(arr2); //合并数组
        that.setData({
          activityList: arr1 //合并后更新datalist
        })
      })
    }



  },


})