var app = getApp();
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
  goResult:function(){
    let character = this.data.character.join("");
    wx.redirectTo({
      url: './result/result?character='+character,
    })
  },
  goPost: function(){
    wx.redirectTo({
      url: '../../pages/letterbox/letterbox',
    })
  }
})