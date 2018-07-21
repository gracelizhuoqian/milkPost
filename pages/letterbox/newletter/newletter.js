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
      subjec = e.detail.value.subjec,
      content = e.detail.value.content,
      that = this,
      date = util.formatTime(new Date());
      var options = {
          url: service.addOneLetter,
          method: 'POST',
          data: {
            title,
            subjec,
            content,
            date
          },
          success: function (res) {
              wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000
              });
              that.goBack();

          },
          fail: function (err) {
            wx.showModal({
                  title: '提示',
                  content: err.message,
                  showCancel: false,
            });
          }
      };
      if(title && subjec && content){
          util.sendRequest(options);
      }else{
        wx.showModal({
          title: '提示',
          content: '请填写完整再提交哦',
          showCancel: false
        });
      }
}
  
 
})