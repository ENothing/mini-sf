import {
  http
} from '../utils/util.js'

var url = {
  activityIndex: "/activity/index",
}
module.exports = {
  // userLogin(code) {
  //   return http({
  //     url: url.userLogin,
  //     data: { code: code },
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     }
  //   })
  // },
  activityIndex() {
    return http({
      url: url.activityIndex,
    })
  },
  userCardReceive() {
  return http({
    url: url.userCardReceive,
    method: "GET"
  })
},
}