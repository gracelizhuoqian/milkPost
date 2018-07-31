var testsData = require("../../../data/test-data.js");
var service = require('../../../service.js');
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    answer: [],
  },
  onLoad: function (options) {
    let testId = options.id;
    let testData = testsData.testList[testId];
    this.setData({
      currentTestId: testId,
      testData: testData
    });
  },
  onChange(e) {
    let qid = e.currentTarget.id;
    let ans = this.data.answer;
    ans[qid] = e.detail.value;
    this.setData({
      answer: ans
    });
  },
  formSubmit(e) {
    let {data} = this;
    let res=this.processAns(data.answer,data.currentTestId);
    let pages=getCurrentPages();
    let prevPage = pages[pages.length - 2];//上一页面
    let nowCharacter = prevPage.data.character;
    let hasFinished = 0; //标记是否完成
    nowCharacter[data.currentTestId]=res;
    prevPage.setData({
      character: nowCharacter
    });
    prevPage.data.character.forEach((item)=>{
      if(item){
        hasFinished++;
      }
    });
    if(hasFinished === 4){
      prevPage.setData({
        showToLetter: true
      });
        //写信前发送掉性格信息以及个人信息
      let sendCharacter = prevPage.data.character.join("");
      let userInfo = app.globalData.userInfo;
        util.sendRequest({
          url: service.character,
          data: {
            character: sendCharacter,
            nickName: userInfo.nickName,
            gender: userInfo.gender == 2 ? "female" : "male"
          },
          method: "POST",
          success: function (res) {
            if (res.code == 200) {
              wx.showToast({
                title: '收到你的测试结果啦',
              });
            }
          },
          fail: function (res) {
            console.log(res);
          }
        })
      
    }
    if (this.data.currentTestId<3){
      wx.redirectTo({
        url: './question?id=' + (++this.data.currentTestId),
      })
    }else{
      wx.navigateBack({
        delta:1
      });
    }
  },
  processAns(ans, key) {
    let ans1 = 0,
      ans2 = 0;
    for (let value of ans) {
      if (value === "1") {
        ans1++;
      }
      if (value === "2") {
        ans2++;
      }
    }
    switch (key) {
      case "0":
        return ans1 >= ans2 ? "E" : "I";
      case "1":
        return ans1 >= ans2 ? "S" : "N";
      case "2":
        return ans1 >= ans2 ? "F" : "T";
      case "3":
        return ans1 >= ans2 ? "J" : "P";
    }
  }
})