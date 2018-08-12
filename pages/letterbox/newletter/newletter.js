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
       
  },
  goBack: function(){
    wx.navigateBack({
        delta: 1
    })
  },
 formSubmit: function(e) {
  var title = e.detail.value.title,
      content = e.detail.value.content,
      that = this,
      date = util.formatTime(new Date());
      var options = {
          url: service.addOneLetter,
          method: 'POST',
          data: {
            title,
            content,
            date
          },
          success: function (res) {
            if(res.code == 200){
              wx.showToast({
                title: '我们会尽快回复的！',
                icon: 'none',
                duration: 1000,
                complete: function (){
                  setTimeout(function(){
                    that.goBack();
                  },1000)
                  
                }
              });
            }else{
              wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
              })
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
      if(title && content){
          if (content.length < 15) {
            wx.showModal({
              title: '提示',
              content: '内容最少15个字哦',
              showCancel: false
            });
          }else{
            util.sendRequest(options);
          }
      }else{
        wx.showModal({
          title: '提示',
          content: '请填写完整再提交哦',
          showCancel: false
        });
      }
}
  
 
})