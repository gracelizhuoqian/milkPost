// pages/mail/mail.js
var lettersData = require('../../data/letters-data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       // this.getLetterListData();
       if (app.globalData.userInfo) {
            this.setData({
            userInfo: app.globalData.userInfo
          });
        }
        this.setData({
            letterList:lettersData.letterList
        });
  },
  getLetterListData: function () {
      var url = app.globalData.doubanBase+'/getLetterListData';
      var that = this;
      var param = 'openId='+that.data.userInfo.openId;
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        data:param,
        success: function (res) {
          that.setData({letterList: res.data});
        },
        fail: function (error) {
          // fail
          console.log(error)
        }
    })
  },
  tapName: function(event) {
    console.log(1)
  },
  onLetterTap: function(event){
     var letterId = event.currentTarget.dataset.letterid;
     var openId = event.currentTarget.dataset.openid;
    
     wx.navigateTo({
        url: "letterdetail/letterdetail?letterId=" + letterId + "&openId=" + openId
     })
  },
  onNewTap: function(){

    wx.navigateTo({
        url: "newletter/newletter"
     })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})