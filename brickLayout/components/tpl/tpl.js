function init(config) {
  let _this = this;

  // 暴露点击卡片事件给用户

  _this.onBrickItemTap = e => {
    let card_id = e.currentTarget.dataset.cardId
    this.triggerEvent('tapCard', {
      card_id
    })
  }

  _this.onLikeButtonTap = e => {
    var card_id = e.currentTarget.dataset.cardId
    let liked = e.currentTarget.dataset.liked
    var rawData = this.data.rawData
    console.log(rawData)


    for (var index in rawData) {
      if (rawData[index].id == card_id) {
        rawData[index].liked = liked == true ? false : true
        rawData[index].likes = liked == true ? rawData[index].likes-1 : rawData[index].likes+1
      }
    }

    this.setData({
      rawData: rawData
    })

    this.triggerEvent('tapLike', {
      card_id,
      liked
    })
  }

  _this.onUserAreaTap = e => {
    console.log(e)
    let user_id = e.currentTarget.dataset.userId
    this.triggerEvent('tapUser', {
      user_id
    })
  }
}

module.exports = {
  init
}