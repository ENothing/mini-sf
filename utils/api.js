import {http} from '../utils/http.js'

var url = {
  activityIndex: "/activity/index",
  activityList: "/activity/list",
  activityDetail: "/activity/detail",

}
module.exports = {
  activityIndex() {
    return http({
      url: url.activityIndex,
      method: "GET"
    })
  },
  activityList(page) {
    return http({
      url: url.activityList+"?page="+page,
      method: "GET"
    })
  },
  activityDetail(id) {
    return http({
      url: url.activityDetail + "/" + id,
      method: "GET"
    })
  },
}

