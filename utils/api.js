import {http} from '../utils/http.js'

var url = {
  activityIndex: "/activity/index",
  activityList: "/activity/list",
  activityDetail: "/activity/detail",

  articleList: "/bbs/list",
  articleDetail: "/bbs/detail",
  articleCommentList:"/bbs/comment_list"

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


  articleList(page) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJFcmljX05vdGhpbmdfIiwiZXhwIjoxNTc5NTkxOTIxLCJpYXQiOjE1Nzk1MDU1MjEsImlkIjoxLCJpc3MiOiJzb3VsZmlyZSIsIm5iZiI6MTU3OTUwNTUyMSwib3BlbmlkIjoib253a0QwVXhRdmdmSFRpejdxeVQtU0JTRUpYNCIsInNlc3Npb25fa2V5IjoiN2FPSXZmaXNwOXpRUEkwK3NiTFMxQT09In0.PyAVkKD-ugyhlsIJZ3sRSaB55rN4kc4z4ZeyO0RKVi8"
      },
      url: url.articleList + "?page=" + page,
      method: "GET"
    })
  },
  articleDetail(id) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJFcmljX05vdGhpbmdfIiwiZXhwIjoxNTc5NTkxOTIxLCJpYXQiOjE1Nzk1MDU1MjEsImlkIjoxLCJpc3MiOiJzb3VsZmlyZSIsIm5iZiI6MTU3OTUwNTUyMSwib3BlbmlkIjoib253a0QwVXhRdmdmSFRpejdxeVQtU0JTRUpYNCIsInNlc3Npb25fa2V5IjoiN2FPSXZmaXNwOXpRUEkwK3NiTFMxQT09In0.PyAVkKD-ugyhlsIJZ3sRSaB55rN4kc4z4ZeyO0RKVi8"
      },
      url: url.articleDetail + "/" + id,
      method: "GET"
    })
  },
  articleCommentList(id) {
    return http({
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJFcmljX05vdGhpbmdfIiwiZXhwIjoxNTc5NTkxOTIxLCJpYXQiOjE1Nzk1MDU1MjEsImlkIjoxLCJpc3MiOiJzb3VsZmlyZSIsIm5iZiI6MTU3OTUwNTUyMSwib3BlbmlkIjoib253a0QwVXhRdmdmSFRpejdxeVQtU0JTRUpYNCIsInNlc3Npb25fa2V5IjoiN2FPSXZmaXNwOXpRUEkwK3NiTFMxQT09In0.PyAVkKD-ugyhlsIJZ3sRSaB55rN4kc4z4ZeyO0RKVi8"
      },
      url: url.articleCommentList + "?article_id=" + id,
      method: "GET"
    })
  },
}

