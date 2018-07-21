var service = require('./../../service.js');
var util = require('./../../utils/util.js');
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
  goPost: function(){
    //写信前发送掉性格信息以及个人信息
    let character = this.data.character.join("");
    let userInfo = app.globalData.userInfo;
    util.sendRequest({
      url: service.character,
      data:{
        character:character,
        nickName:userInfo.nickName,
        gender: userInfo.gender == 2 ? "female":"male"
      },
      method:"POST",
      success:function(res){
        if(res.code == 200){
          wx.redirectTo({
            url: '../../pages/letterbox/letterbox',
          })
        }
      },
      fail:function(res){
        console.log(res);
      }
    })
  }
})