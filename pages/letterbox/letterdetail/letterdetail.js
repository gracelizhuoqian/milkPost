// pages/letterbox/letterdetail/letterdetail.js
var lettersData = require('../../../data/letters-data.js')
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
      var letterId = Number(options.letterId);
      var openId = options.openId;
      var that =this;
      that.data.currentLetterId = letterId;
      that.data.openId = openId;
      that.setData({letterDetail: lettersData.letterList[letterId]});
      
      if(letterId%2 === 0 && lettersData.letterList[letterId+1]){
         
        that.setData({letterReply: lettersData.letterList[letterId+1]});
      }
  
      // this.getLetterDetail();
      // this.getLetterReply();

  },
  getLetterDetail: function(){
      var url = app.globalData.doubanBase + '/getLetterDetailData';
      var that = this;
      var param = 'openId=' + that.data.openId + 'letterId=' + that.data.letterId;
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        data:param,
        success: function (res) {
          that.setData({letterDetail: res.data});
        },
        fail: function (error) {
          // fail
          console.log(error)
        }
    })
  },
  getLetterReply: function(){
      var url = app.globalData.doubanBase+'/getLetterReplyData';
      var that = this;
      var param = 'openId=' + that.data.openId + 'letterId=' + that.data.letterId;
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        data:param,
        success: function (res) {
          that.setData({letterReply: res.data});
        },
        fail: function (error) {
          
        }
    })
  },
  goBack: function(){
    wx.navigateBack({
        delta: 1
    })
  }

 
})