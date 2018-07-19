var testsData = require("../../../data/test-data.js");
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
    nowCharacter[data.currentTestId]=res;
    prevPage.setData({
      character: nowCharacter
    });
    if (this.data.currentTestId<3){
      wx.redirectTo({
        url: '../question/question?id=' + (++this.data.currentTestId),
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