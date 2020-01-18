import {http} from '../utils/http.js'

var url = {
  activityIndex: "/activity/index",
}
module.exports = {
  activityIndex() {
    return http({
      url: url.activityIndex,
      method: "GET"
    })
  },
}

