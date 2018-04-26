module.exports = {
	// conver tieng viet sang tieng anh
	viToEn: function(alias) {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        str = str.replace(/ + /g," ");
        str = str.trim(); 
        return str;
    },

    rad: function (x) {
        return x * Math.PI / 180;
    },

    // tinh khoang cach
    getDistance: function (p1, p2) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = this.rad(p2.lat - p1.lat);
        var dLong = this.rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        var x = d / 1000; // returns the distance in meter
        var n = parseFloat(x);
        x = Math.round(n * 100) / 100;
        return x;
    },

    addMinutes: function(date, minutes) { // Cong them phut vao thoi gian cho truoc
        return new Date(date.getTime() + minutes*60000);
    },
    // ham cong them ngay
    addDays(date, days){
        var d;
        var dateParts = date.split('-').map(function(i){ return parseInt(i) });
        
        if(dateParts.length == 3){
            d = new Date(dateParts[2], dateParts[1]-1, dateParts[0]+days);
        }
        return this.dateDmy(d)
    },

    // dinh dang thoi gian
    format_datetime: function(format) {
        var o = {
          "M+" : this.getMonth()+1, //month
          "d+" : this.getDate(),    //day
          "h+" : this.getHours(),   //hour
          "m+" : this.getMinutes(), //minute
          "s+" : this.getSeconds(), //second
          "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
          "S" : this.getMilliseconds() //millisecond
        }
      
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
          (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
          format = format.replace(RegExp.$1,
            RegExp.$1.length==1 ? o[k] :
              ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    } ,

    // dinh dang thoi gian 17/01/2018 12:20 am
    formatDateTime: function(date, delimiter = '/') {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        // console.log(date.getMonth());
        return date.getDate() + delimiter + (date.getMonth()+1)  + delimiter + date.getFullYear() + " " + strTime;
    },
    
    // dinh dang thoi gian 2018/01/17
    formatDate: function(date, type, format, delimiter = '/'){
    	var d, newDate;
        if(date == null || date == ""){
            newDate = date
        }else{

        	switch (format){
        		case 'dmy':
    				// thoi gian truyen vao dang 12-10-2018
		        	if(type == 0){
		        		d = date.split('-');
						newDate = d[0]+delimiter+d[1]+delimiter+d[2]
		        	}else if(type == 1) {
		        		var new_date = new Date(date);
			            var d = new Date(date),
			                month = '' + (d.getMonth() + 1),
			                day = '' + d.getDate(),
			                year = d.getFullYear();

			            if (month.length < 2) month = '0' + month;
			            if (day.length < 2) day = '0' + day;
			           
			            newDate = [day, month, year].join(delimiter);
		        	}

        			break

        		case 'mdy':
    				// thoi gian truyen vao dang 12-10-2018
		        	if(type == 0){
		        		d = date.split('-');
						newDate = d[0]+delimiter+d[1]+delimiter+d[2]
		        	}else if(type == 1) {
		        		var new_date = new Date(date);
			            var d = new Date(date),
			                month = '' + (d.getMonth() + 1),
			                day = '' + d.getDate(),
			                year = d.getFullYear();

			            if (month.length < 2) month = '0' + month;
			            if (day.length < 2) day = '0' + day;
			           
			            newDate = [month,day, year].join(delimiter);
		        	}

        			break
        		case 'ymd':
    				// thoi gian truyen vao dang 12-10-2018
		        	if(type == 0){
		        		d = date.split('-');
						newDate = d[2]+delimiter+d[1]+delimiter+d[0]
		        	}else if(type == 1) {
		        		var new_date = new Date(date);
			            var d = new Date(date),
			                month = '' + (d.getMonth() + 1),
			                day = '' + d.getDate(),
			                year = d.getFullYear();

			            if (month.length < 2) month = '0' + month;
			            if (day.length < 2) day = '0' + day;
			           
			            newDate = [month, year,day].join(delimiter);
		        	}

        			break
        	}
        	
            
        }

        return newDate
    },

    // chi cho phep nhap email
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    // cho phép nhập tiếng việt, và có khoảng trống
    validateName(name){
        
        var re = /^([a-zA-Z_\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]){2,30}$/
        return re.test(String(name).toLowerCase());
    },

    // chi cho phep nhap so dien thoai
    validatePhone(phone) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        return re.test(String(phone).toLowerCase());
    },

    // khong cho phep nhap ki tu dac biet
    validateSpecialCharacter(str){
        var re = /^[0-9a-zA-Z]+$/
        return re.test(str);
    },

    validateUrl (url) {
	  url = Helpers.fullUrl(url);

	  var reg = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
	  return reg.test(url);
	}

    // search like
    filterSearch(arr, k, v){
        v = v.toLowerCase()
        var newArr = []
        arr.forEach(item => {
            if(item[k] != null && item[k] != ''){
                var matches = item[k].toLowerCase().indexOf(v) >= 0 ? true : false;
                if(matches){
                    newArr.push(item)
                }
            }
            
        })
        return newArr
    },

    multiFilter(array, filters) {
   		// let filters = {
			// 	CountryCode: key_nat,
			// 	Description: key_desc
			// };
		const filterKeys = Object.keys(filters);
		// filters all elements passing the criteria
		return array.filter((item) => {
		  // dynamically validate all filter criteria
		  return filterKeys.every(key => !!~filters[key].indexOf(item[key]));
		});
	},

	// tim kiem phan tu trong mang
	find(arr, key, value){
		return arr.find(item => item[key] === value)
	},

	// so sanh thoi gian
	compareDate(fromDate, toDate){
		var to 	  		= new Date(toDate),
			from  		= new Date(fromDate),
			timeDiff  	= Math.abs(to.getTime() - from.getTime());
	
		return Math.ceil(timeDiff / (1000 * 3600 * 24));
	},

	isChecked(val){
	  return (val == true ||  val=='true' || val=='1') ? "checked" : "";
	};
	isChecked2(val1, val2){
	  return (val1 == val2) ? "checked" : "";
	};
	isChecked3(array, val){
	  return (Array.isArray(array) && _.contains(array,val)) ? "checked" : "";
	};
	isSelected(val){
	  return (val == true ||  val=='true' || val=='1') ? "selected" : "";
	};
	isSelected2(val1, val2){
	  return (val1 == val2) ? "selected" : "";
	};

	isTrue(val){
	  return (val == true ||  val=='true' || val=='1');
	};
	isDisabled(val){
	  return (val == true ||  val=='true' || val=='1') ? "disabled" : "";
	};
	isHidden(val){
	  return val ? "display:none;" : "";
	};
}