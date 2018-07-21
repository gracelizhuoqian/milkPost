// pages/letterbox/letterdetail/letterdetail.js
const service = require('../../../service.js');
const util = require('../../../utils/util.js');

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
      var index = options.index;
      this.setData({index});
      this.getLetterDetail();
      

  },
  getLetterDetail: function(){
      var that = this;
       var options = {
          url: service.getOneLetter,
          method: 'GET',
          data: {index},
          success: function (res) {
              that.setData({letterDetail: res.letterData[0]});
              if(res.letterData[1]){
                  that.setData({letterReply: res.letterData[1]});
              }
          },
          fail: function (err) {
            wx.showToast({
              title: err.message,
              icon: 'none',
              duration: 2000
            })
          }
      };
      util.sendRequest(options);
  },
  goBack: function(){
    wx.navigateBack({
        delta: 1
    })
  }

 
})