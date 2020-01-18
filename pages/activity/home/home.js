import api from '../../../utils/api.js'

// import http from '../../../utils/http.js'
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://bpic.588ku.com//back_origin_min_pic/19/05/10/912f323ee44993a99126070f8ea38e5e.jpg!/fw/750/quality/99/unsharp/true/compress/true'
    }, {
      id: 1,
      type: 'image',
      url: 'https://bpic.588ku.com//back_origin_min_pic/19/05/16/3f47ee6324f1f943500b5b85c6496fb5.jpg!/fw/750/quality/99/unsharp/true/compress/true',
    }],
    msgList: [{
      title: "重要通知：因近日来连大雪，318国道至新都桥段实行交通管制，请过往游客车辆绕行。",
      url: "test"
    }, {
      title: 'test2',
      url: "test3"
    }],
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 0,
      name: '自驾'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 0,
      name: '徒步'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '露营'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 0,
      name: '滑雪'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '登山'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '探沙'
    }],
    gridCol: 3,
    skin: false,
  },
  attached() {

    api.activityIndex().then(data=>{ 
      console.log(data)
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

  },


})