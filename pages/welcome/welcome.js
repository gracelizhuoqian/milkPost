Page({
  data: {
    eye: true
  },
  enterNew: function () {
    wx.redirectTo({
      url: '../login/login',
    })
  },
})
