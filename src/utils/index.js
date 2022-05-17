import {
  watch,
  reactive
} from 'vue';


export function toZero(num) {
  return num < 10 ? '0' + num : num;
}

export function formatTime(time) {
  if (time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return `${[year, toZero(month), toZero(day)].join('-')} ${[toZero(hour), toZero(minute), toZero(second)].join(':')}`;
  }
  return '';
}

function doHandleMonth(month){
  var m = month;
  if(month.toString().length == 1){
   m = "0" + month;
  }
  return m;
}

export function getOneDayData(list, preDay, nextDay){
  var dayData = [];
  let pre = new Date(preDay).getTime();
  let next = new Date(nextDay).getTime();
  for(var i = 0; i < list.length; i++){
    let now = new Date(list[i].createdAt).getTime()
    if(now <= next && now >= pre){
      dayData.push(list[i]);
    }
  }
  return dayData;
}

export function getDay(day) {
  var today = new Date();
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}

export const beforeAvatarUpload = (file) => {
  const isJPG = file.type.includes('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传头像格式错误!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像不能超过2MB!')
  }
  return isJPG && isLt2M
}