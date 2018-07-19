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
module.exports = {
  formatTime: formatTime,
  convertToStarsArr: convertToStarsArr
}
