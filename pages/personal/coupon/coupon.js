import api from '../../../utils/api.js'
const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    tabNav: ['未使用', '已使用', '已过期'],
    unusedCoupons: null,
    usedCoupons: null,
    exusedCoupons: null,
    unusedPage: 1,
    usedPage: 1,
    exusedPage: 1,
    unusedLastPage: 1,
    usedLastPage: 1,
    exusedLastPage: 1,
    is_get_0: true,
    is_get_1: true,
    is_get_2: true
  },
  onLoad: function(options) {
    api.userCoupons(0, this.data.unusedPage).then(data => {
      console.log(data)
      this.setData({
        unusedCoupons: data.coupons,
        unusedLastPage: data.last_page,
      })
    })
  },
  onReachBottom: function() {
    var page = 1
    var coupons = null
    var is_get = true

    switch (this.data.TabCur) {
      case 0:
        if (this.data.unusedLastPage == this.data.unusedPage) {
          is_get = false
        } else {
          this.setData({
            unusedPage: this.data.unusedPage + 1
          })
        }
        page = this.data.unusedPage
        coupons = this.data.unusedCoupons
        break;
      case 1:
        if (this.data.usedLastPage == this.data.usedPage) {
          is_get = false
        } else {
          this.setData({
            usedPage: this.data.usedPage + 1
          })
        }
        page = this.data.usedPage
        coupons = this.data.usedCoupons
        break;
      case 2:
        if (this.data.exusedLastPage == this.data.exusedPage) {
          is_get = false
        } else {
          this.setData({
            exusedPage: this.data.exusedPage + 1
          })
        }
        page = this.data.exusedPage
        coupons = this.data.exusedCoupons
        break;
    }

    if (is_get) {
      api.userCoupons(this.data.TabCur, page).then(data => {
        console.log(data)
        var arr = data.coupons
        coupons = coupons.concat(arr);
        switch (this.data.TabCur) {
          case 0:
            this.setData({
              unusedCoupons: coupons
            })
            break;
          case 1:
            this.setData({
              usedCoupons: coupons
            })
            break;
          case 2:
            this.setData({
              exusedCoupons: coupons
            })
            break;
        }
      })
    }



  },
  tabSelect(e) {
    console.log(e);
    var status = e.currentTarget.dataset.id
    var is_get = false

    this.setData({
      TabCur: status,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })



    switch (status) {
      case 0:
        // if (this.data.is_get_0) {
        //   is_get = true,
        //     this.setData({
        //       is_get_0: false
        //     })
        // }
        break;
      case 1:
        if (this.data.is_get_1) {
          is_get = true,
            this.setData({
              is_get_1: false
            })
        }
        break;
      case 2:
        if (this.data.is_get_2) {
          is_get = true,
            this.setData({
              is_get_2: false
            })
        }
        break;
    }

    if (is_get) {
      api.userCoupons(status, 1).then(data => {
        switch (status) {
          case 0:
            // this.setData({
            //   unusedCoupons: data.coupons,
            //   unusedLastPage: data.last_page,
            // })
            break;
          case 1:
            this.setData({
              usedCoupons: data.coupons,
              usedLastPage: data.last_page,

            })
            break;
          case 2:
            this.setData({
              exusedCoupons: data.coupons,
              exusedLastPage: data.last_page,
            })
            break; 

        }
      })
    }

  }
})