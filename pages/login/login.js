// pages/login/login.js
var app = getApp();
const service = require('../../service.js');
const util = require('../../utils/util.js');
var isEmptyObject = function (e) {
  var temp;
  for (temp in e)
    return !1;
  return !0
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  onLoad: function(){
    wx.login({
      success: function(res){
        let code = res.code;
        if(code){
          wx.request({
            url: service.login,
            data:{
              code:code
            },
            method:'POST',
            success:function(response){
              wx.setStorageSync('token', response.data.token);
              app.globalData.userFlag = response.data.userFlag;//修改用户状态
            },
            fail:function(err){
              console.log(err);
            }
          })
        }
      }
    })
  },
  nextPage:function(){
    if(app.globalData.userFlag == 0){
      wx.redirectTo({
        url: '/pages/test/test',
      })
    }else{
      wx.redirectTo({
        url:"../../pages/letterbox/letterbox",
      })
    }
  },
  getUserInfoFun: function () {
    var that = this;
    if (app.globalData.userInfo) {
      that.nextPage();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo;
        that.nextPage();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.checkSettingStatu();
          that.nextPage();
        },
        fail: function () {
          wx.showModal({
            title: '用户未授权',
            content: '如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
            showCancel: false,
            success: function (resbtn) {
              if (resbtn.confirm) {
                wx.openSetting({
                  success: function success(resopen) {
                    //  获取用户数据
                    that.checkSettingStatu();
                    that.nextPage();
                  }
                });
              }
            }
          })
        }
      })
    }
  },
  checkSettingStatu: function (cb) {
    var that = this;
    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
    wx.getSetting({
      success: function success(res) {
        var authSetting = res.authSetting;
        if (isEmptyObject(authSetting)) {
          //第一次
        } else {
          // 没有授权的提醒
          if (authSetting['scope.userInfo'] === false) {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: function success(res) {
                      if (res.authSetting['scope.userInfo'] === false) {
                        checkSettingStatu(cb);
                      } else {
                        wx.reLaunch({
                          url: 'pages/login/login',
                        })
                      }
                    }
                  });
                }
              }
            })
          }
        }
      }
    })
  }
})