var postData=require("../../data/posts-data.js");
//只能使用相对路径
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content:postData.postList
  },

  /**
   * 生命周期函数--监听页面加载1
   */
  onLoad: function (options) {
    // this.setData({content:postData.postList});
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    //dataset是所有自定义属性的集合,大小写忽略，连字符转化为驼峰命名格式
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
    //跳转到子页面，要返回，使用navigate
  },

  /**
   * 生命周期函数--监听页面初次渲染完成3
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示2
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载，相当于页面关闭
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