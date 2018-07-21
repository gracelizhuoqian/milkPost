const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const convertToStarsArr = function(n){
  let star=Math.round(n/2);
  let arr=[];
  for(let i=0;i<5;i++){
    if(i<star){
      arr[i]=1;
    }else{
      arr[i]=0;
    }
  }
  return arr;
}


const sendRequest = function(json) {
  var me = this;
  var token = wx.getStorageSync("token");
  wx.request({
    url: json.url,
    data: json.data,
    method: json.method,
    header: {
      'content-type': 'application/json', // 默认值,
      'x-access-token': token
    },
    success: function (res) {//封装登录超时或错误自动退出逻辑
      var data = res.data;
      if (data.code == "401") {
        wx.showModal({
          title: '登录超时',
          content: '请重新登录',
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            } else if (res.cancel) {
              wx.redirectTo({
                url: 'pages/welcome/welcome',
              })
            }
          }
        })
      } else {
        json.success(data);
      }
    },
    fail: function (res) {
      var data =res.data;
      json.fail(data);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  convertToStarsArr: convertToStarsArr,
  sendRequest: sendRequest,
}
