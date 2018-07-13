var postsData = require("../../../data/posts-data.js"); 
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId=options.id;
    var postData = postsData.postList[postId];
    //可以直接通过url传递
    var isPlaying =app.globalData.g_isPlaying;
    this.setData({
      postData: postData,
      postId: postId,
      isPlaying:isPlaying
    });
    //缓存：不主动清除则一直存在，重复赋值则替换，remove单独删除/clear全部删除缓存，永久存在，缓存的上限不能超过10M，同步都带sync后缀，在移动端清除本地缓存需要设置交互和clearStorage
    var collection=wx.getStorageSync("collections");
    if(!collection){
      var collection={};
      collection[postId]=false;
      wx.setStorageSync("collections", collection);
    }
    var hasCollected = collection[postId];
    if (hasCollected == undefined) {
      hasCollected = false;
    }
    this.setData({
      collected: hasCollected
    });
    var that=this;
    // 不能给data中的数据赋undefined，所有的数据前最好都加上data 
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        isPlaying:true
      });
      app.globalData.g_isPlaying=true;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlaying: false
      });
      app.globalData.g_isPlaying = false;
    });
  },
  onCollection:function(event){
    var self=this;
    var collection=wx.getStorageSync('collections');
    var collectFlag=collection[this.data.postId];
    //collection[this.data.postId]=!collection[this.data.postId];
    //wx.setStorageSync('collections', collection);
    // 邮箱模式或应该采用异步模式
    // this.setData({
    //   collected:collection[this.data.postId]
    // });

    // wx.showToast({
    //   title: this.data.collected?"收藏成功":"取消收藏",
    //   duration: 1000,
    //   icon: "success",
    // });
    wx.showModal({

      title:"收藏",
      content: !collectFlag ? "是否收藏该文章" : "是否取消收藏",
      cancelColor: "#3d3d3d",
      success(res){
        if ((collectFlag && res.cancel) || (!collectFlag && res.confirm)){
          self.setData({
            collected:true
          })

        }else{
          self.setData({
            collected: false
          })
        }
        collection[self.data.postId]=self.data.collected;
        wx.setStorageSync('collections', collection);
      }
    })
  },
  onShare:function(event){
    wx.showActionSheet({
      itemList: [
        "分享到QQ",
        "朋友圈",
        "微信"
      ],
      success:function(res){
        console.log(res.tapIndex);
        //如果取消则什么都不返回
      },
    });
  },
  onMusic:function(event){
    var postData=this.data.postData;
    if(this.data.isPlaying){
      wx.pauseBackgroundAudio();
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.coverImg
      });
    }
    this.setData({
      isPlaying:!this.data.isPlaying
    });
    //需要使用setData才能触发数据监听
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
    this.data.isPlaying=false;
    wx.pauseBackgroundAudio();
    app.globalData.g_isPlaying=false;
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