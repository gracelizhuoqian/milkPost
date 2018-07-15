// pages/letterbox/newletter/newletter.js
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
       if (app.globalData.userInfo) {
            this.setData({
            userInfo: app.globalData.userInfo
          });
        }
  },
  goBack: function(){
    wx.navigateBack({
        delta: 1
    })
  },
   formSubmit: function(e) {
    var title = e.detail.value.title,
        theme = e.detail.value.theme,
        content = e.detail.value.content,
        url = app.globalData.doubanBase + '/postletter',
        that = this;
        if(title && theme && content){
            wx.request({
              url: url,
              method: 'POST',
              data:'pageSize=1&pageNum=10',
              header: {
                'content-type':'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: function (res) {
                  that.goBack();
              },
              fail: function(){  
                 wx.showModal({
                    title: '提示',
                    content: '提交失败',
                    showCancel: false,
                  });
              }  

           })
        }else{
          wx.showModal({
            title: '提示',
            content: '请填写完整再提交哦',
            showCancel: false,
          });
        }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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