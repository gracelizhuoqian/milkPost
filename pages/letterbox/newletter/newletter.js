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
        that = this,
        date = that.formatDate(new Date());
        if(title && theme && content){
            wx.request({
              url: url,
              method: 'POST',
              data:{
                content: content,
                title: title,
                theme: theme,
                date: date
              },
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
  formatDate: function (date, format) {
    var paddNum = function (num) {
      num += "";
      return num.replace(/^(\d)$/, "0$1");
    }
    //指定格式字符
    var cfg = {
      yyyy: date.getFullYear() //年 : 4位
      , yy: date.getFullYear().toString().substring(2)//年 : 2位
      , M: date.getMonth() + 1  //月 : 如果1位的时候不补0
      , MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
      , d: date.getDate()   //日 : 如果1位的时候不补0
      , dd: paddNum(date.getDate())//日 : 如果1位的时候补0
      , hh: date.getHours()  //时
      , mm: paddNum(date.getMinutes()) //分
      , ss: date.getSeconds() //秒
    }
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function (m) { return cfg[m]; });
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