var testsData=require("../../../data/test-data.js");
Page({
  data: {
    // value1: '',
    // value2: '1',
    // value3: '1',
    // value4: '1',
  },
  onLoad:function(options){
    let testId = options.id;
    let testData = testsData.testList[testId];
    this.setData({
      currentTestId:testId,
      testData:testData
    });
  },
  onChange1(field, e) {
    this.setData({
      [field]: e.detail.value
    })
  },
  onChange(e) {
    this.onChange1('value1', e)
  },
  onChange2(e) {
    this.onChange('value2', e)
  },
  onChange3(e) {
    this.onChange('value3', e)
  },
  onChange4(e) {
    this.onChange('value4', e)
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
})