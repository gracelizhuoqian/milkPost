// pages/mail/mail.js
var lettersData = require('../../data/letters-data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 180
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       // this.getLetterListData();
       if (app.globalData.userInfo) {
            this.setData({
            userInfo: app.globalData.userInfo
          });
        }
        this.setData({
            letterList:lettersData.letterList
        });
  },
  getLetterListData: function () {
      var url = app.globalData.doubanBase+'/getLetterListData';
      var that = this;
      var param = 'openId=';
      wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "json"
        },
        data:param,
        success: function (res) {
          that.setData({letterList: res.data});
        },
        fail: function (error) {
          // fail
          console.log(error)
        }
    })
  },
  onLetterTap: function(event){
     var letterId = event.currentTarget.dataset.letterid;
     var openId = event.currentTarget.dataset.openid;
    
     wx.navigateTo({
        url: "letterdetail/letterdetail?letterId=" + letterId + "&openId=" + openId
     })
  },
  onNewTap: function () {

    wx.navigateTo({
      url: "newletter/newletter"
    })
  },
  touchS: function (e) {
   
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
    
  },
  touchM: function (e) {
   
    if (e.touches.length == 1) {
   
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {
        txtStyle = "right:0rpx";
      } else if (disX > 0) {
        txtStyle = "right:" + disX + "rpx";
        if (disX >= delBtnWidth) {
        
          txtStyle = "right:" + delBtnWidth + "rpx";
        }
      }
    
      var index = e.target.dataset.index;
      var list = this.data.letterList;
      if (index >= 0) {
        list[index].txtStyle = txtStyle;
  
        this.setData({
          letterList: list
        });
      }
    }
  },

  touchE: function (e) {
    if (e.changedTouches.length == 1) {
    
      var endX = e.changedTouches[0].clientX;
   
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
   
      var txtStyle = disX > delBtnWidth / 2 ? "right:" + delBtnWidth + "rpx" : "right:0rpx";
    
      var index = e.target.dataset.index;
      var list = this.data.letterList;
      if (index >= 0) {
        list[index].txtStyle = txtStyle;
        this.setData({
          letterList: list
        });
      }
    }
  },
  
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },

  delItem: function (event) {
    var letterId = event.currentTarget.dataset.letterid,
        url = app.globalData.doubanBase + '/delete',
        that= this;
        
    wx.showModal({
      title: '提示',
      content: '删除之后不会保留信息也不会再收到回复，确认要删除吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: url,
            method: 'POST',
            data: {
              letterId: letterId
             
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: function (res) {
              that.onLoad();
            },
            fail: function () {
              wx.showModal({
                title: '提示',
                content: '删除失败',
                showCancel: false,
              });
            }

          })
        } else if (res.cancel) {
          return;
        }
      }
    })
    
   
  
  }
  

})