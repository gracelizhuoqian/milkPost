var service = require('./../../service.js');
var util = require('./../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    character:[],
    showToLetter:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onTestDetail: function(event){
    var testId = event.currentTarget.dataset.testid;
    wx.navigateTo({
      url: 'question/question?id='+testId,
    })
  },
  goPost: function(){
    //写信前发送掉性格信息
    
  }
})