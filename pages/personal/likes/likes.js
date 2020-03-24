import api from '../../../utils/api.js'
Page({
  data: {
    activity:[],
    last_page:1,
    page:1
    

  },
  onLoad: function (options) {
    api.per_collect(1).then(data => {
      console.log(data)
      this.setData({
        activity:data.list,
        last_page:data.last_page,
      })

    })
  },
  onReachBottom: function () {

  },
})