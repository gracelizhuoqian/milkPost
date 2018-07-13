var util=require('../../utils/util.js');
var app = getApp();
//一定要记得引入啊！！！
// pages/movies/movies.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    commingSoon:{},
    top250:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let baseUrl = app.globalData.doubanBase;
    let inTheatersUrl = baseUrl +"/v2/movie/in_theaters?start=0&count=3";
    let commingSoonUrl = baseUrl +"/v2/movie/coming_soon?start=0&count=3";
    let top250Url = baseUrl + "/v2/movie/top250?start=0&count=3";
    this.getMovieData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieData(commingSoonUrl,"commingSoon","即将上映");
    this.getMovieData(top250Url,"top250","高分电影");
  },
  getMovieData:function(url,key,category){
    let self = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        self.processDoubanData(res.data, key, category);
      },
      fail: function () {
        console.log("error");
      }
    })
  },
  processDoubanData:function(movieData,key,category){
    let movies=[];
    for(let movie of movieData.subjects){
      let title = movie.title;
      if (title.length>6){
        title=title.substring(0,6)+'...';
      }
      let temp={
        title:title,
        average:movie.rating.average,
        coverageUrl:movie.images.large,
        movieId:movie.id,
        stars: util.convertToStarsArr(movie.rating.average),
        
      };
      movies.push(temp);
    }
    let total={};
    total[key]={
      movies:movies,
      category: category
    };
    this.setData(total); 
  },
  onBindFocus:function(){
    console.log('focus');
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