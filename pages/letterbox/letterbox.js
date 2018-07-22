const service = require('../../service.js');
const util = require('../../utils/util.js');

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
         
       
  },
  onShow: function () {
        this.getLetterList();
  },
  getLetterList: function () {
      var that = this;
      var options = {
          url: service.getLetters,
          method: 'GET',
          success: function (res) {
            if (res.code == 200) {
              that.setData({ letterList: res.letterList });
            } else {
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
      util.sendRequest(options);
   
  },
  onLetterTap: function(event){
     var index = event.currentTarget.dataset.index;
    
    
     wx.navigateTo({
        url: "letterdetail/letterdetail?index=" + index
     })
  },
  onNewTap: function () {

    wx.navigateTo({
      url: "newletter/newletter"
    });
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
    
      var index = e.target.dataset.idx;
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
    
      var index = e.target.dataset.idx;
      var list = this.data.letterList;
      if (index >= 0) {
        list[index].txtStyle = txtStyle;
        this.setData({
          letterList: list
        });
      }
    }
  },
  


  delItem: function (event) {
    var index = event.currentTarget.dataset.index,
        that= this;
    var options = {
          url: service.deleteOneLetter,
          method: 'POST',
          data: {index},
          success: function (res) {
            if (res.code == 200) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000,
                complete: function () {
                  that.getLetterList();
                }
              });
            } else {
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
    
        
    wx.showModal({
      title: '提示',
      content: '删除之后不会保留信息也不会再收到回复，确认要删除吗？',
      success: function (res) {
        if (res.confirm) {
          util.sendRequest(options);   
        } else if (res.cancel) {
          return;
        }
      }
    })
    
   
  
  }
  

})