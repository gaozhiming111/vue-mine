/**
* [formatDateTime 时间戳转年月日 时分秒]
* @param  {[type]}  int [时间戳]
* @param  {[type]}  str [时间格式，格式如下]
* 时间格式，[y-m-d h:i:s , y-m-d , h:i:s , ymdhis , y-m , m-d , y年m月d日 , y年m月 , m月d日 , y年m月d日 h时i分s秒 , h时i分s秒]
* @param  {Boolean} bol [默认为 true ,表示 10以下前面补零]
* @return {[type]}      [返回对应格式的日期时间格式]
*/
function formatDateTime(int, str, bol = true) {
    let date = new Date(int);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (bol) {
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
    }
    let strtoLowerCase = str.toLowerCase(); //把传入的转换成小写
 
    switch (strtoLowerCase) {
	case 'y-m-d h:i:s':
	    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	case 'ymdhis':
	    return year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds;
	case 'y-m-d':
	    return year + '-' + month + '-' + day;
	case 'y-m':
	    return year + '-' + month;
	case 'm-d':
	    return month + '-' + day;
	case 'ymd':
	    return year + '' + month + '' + day;
	case 'h:i:s':
	    return hours + ':' + minutes + ':' + seconds;
	case 'his':
	    return hours + '' + minutes + '' + seconds;
	case 'y年m月d日 h时i分s秒':
	    return year + '年' + month + '月' + day + '日' + ' ' + hours + '时' + minutes + '分' + seconds + '秒';
	case 'y年m月d日':
	    return year + '年' + month + '月' + day + '日';
	case 'h时i分s秒':
	    return hours + '时' + minutes + '分' + seconds + '秒';
	case 'y年m月':
	    return year + '年' + month + '月';
	case 'm月d日':
	    return month + '月' + day + '日';
    }
}

export default formatDateTime;