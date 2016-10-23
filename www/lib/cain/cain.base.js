'use strict';
/**
 * @todo Cain工具包
 * @namespace Cain
 * @author haze.liu
 * @since 2016年3月8日 18:34:22
 */
var Cain = {
  isOpenAjaxOverlay:true,
  debug:true,
  /**
  	 * @private
  	 * @function
  	 * @todo 初始化Cain
  	 * @memberof Cain
  	 *
  	 */  
  init:function () {
  	Cain._initLoading();
  	Cain._initOverlay();
  	Cain._initAjax();
  },
  /**
  	 * @private
  	 * @function
  	 * @todo 初始化ajax
  	 * @memberof Cain
  	 *
  	 */  
  _initAjax:function () {
    $.ajaxSetup({
      type: 'POST',
      dataType:'json',
      timeout: 20000,
      beforeSend:function () {
    	 if(Cain.isOpenAjaxOverlay){
    		 Cain.showOverlay({ color:'rgba(255,255,255,0.1)',spinnerFlag:true, isTouchNoClose:true });
    	 }
        
      },
      complete:function () {
    		Cain.hideOverlay();
      },

      error: function (jqXHR, textStatus, errorMsg) {
        Cain.hideOverlay();
        Cain.showAlertDialog({
          content:'操作错误，请重试，或联系管理员！',
          centerBtnContent:'知道了',
          isTouchNoClose:true,
        });
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorMsg);
      },

      statusCode: {
        404: function () {
        	!Cain.debug && (window.location.href = Cain.hostHTML + '404.html');
        },

        500:function () {
        	!Cain.debug && (window.location.href = Cain.hostHTML + '404.html');
        },

        503:function () {
        	!Cain.debug && (window.location.href = Cain.hostHTML + '404.html');
        },

        200: function () {},
      },
    });
  },
  /**
  	 * @private
  	 * @function
  	 * @todo 初始化遮罩层
  	 * @memberof Cain
  	 *
  	 */  
  _initOverlay:function () {

    var html = '<div id="cain-overlay" class="overlay"></div><i class="fa fa-spinner fa-pulse spinner"></i>' +
        '<div id="cain-dialogOverlay" class="overlay"></div>';
    $('body').append(html);
  },
  /**
  	 * @private
  	 * @function
  	 * @todo 初始化全局loading
  	 * @memberof Cain
  	 *
  	 */  
  _initLoading:function () {
    if ($('body').attr('data-notHideLoading') == 'true') {
      return;
    }else {
      Cain.hideLoading();
    }
  },
  /**
	 * @public
	 * @function
	 * @todo 关闭ajax全局遮罩
	 * @memberof Cain
	 *
	 */  
  closeAjaxOverlay:function(){
	  Cain.isOpenAjaxOverlay=false;
  },
  /**
  	 * @private
  	 * @function
  	 * @todo 隐藏全局loading
  	 * @memberof Cain
  	 *
  	 */  
  hideLoading:function () {
    $('.wxloading').fadeOut('slow');
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 显示遮罩层
  	 * @memberof Cain
  	 * @param {Json} json    spinnerFlag 是否显示spinner
  	 * 						 success  成功调用回调
  	 * 						 isTouchNoClose  是否点击空白不关闭
  	 * 						 type 遮罩类型(dialog,default)
  	 *
  	 */  
  showOverlay: function (json) {
    if (!json) {
      json = {};
    }

    if (json.spinnerFlag) {
      $('.spinner').show();
    }
    json.color = json.color || 'rgba(33,33,33,0.5)';
    json.type = json.type || 'default';
    var id = (json.type == 'dialog' ? '#cain-dialogOverlay' : '#cain-overlay');

    $(id).height(document.body.scrollHeight).css({'background-color':json.color}).show();
    $('html,body').css({
      overflow: 'hidden',
    });
    if (!json.isTouchNoClose) {
      $(id).one('click', function () {
        Cain.hideOverlay(json);
        if (json.success) {
          json.success();
        }
      });
    }
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 隐藏遮罩层
  	 * @memberof Cain
  	 * @param {Json} json
  	 *  					type 遮罩类型(dialog,default)
  	 */  
  hideOverlay: function (json) {
    $('html,body').css({
      overflow: '',
    });

    if (!json) {
      json = {};
    }

    json.type = json.type || 'default';
    var id = (json.type == 'dialog' ? '#cain-dialogOverlay' : '#cain-overlay');
    $(id).hide().click();
    $('.spinner').hide();
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 显示对话框
  	 * @memberof Cain
  	 * @param {String} id 关闭的ID
  	 * @param {Boolean} closeAutoWidth 是否关闭适应长度
  	 * @param {Boolean} isTouchNoClose 是否点击空白不关闭
  	 */  
  showDialog:function (id, closeAutoWidth, isTouchNoClose) {
    Cain.closeDialog();
    var that = $('#' + id);
    if (!closeAutoWidth) {
      that.width(document.body.clientWidth - 60);
    }

    that.css({
      'margin-top':'-' + (that.height() / 2 + 30) + 'px',
      'margin-left':'-' + (that.width() / 2 - 10) + 'px',
    });
    that.show();
    Cain.showOverlay({
      type:'dialog',
      isTouchNoClose:isTouchNoClose,
      success:function () {
        if (!isTouchNoClose) {
          var c = $('#' + id);
          c.hide();
          if ($('#' + id).attr('data-destroy') == 'true') {
            $('#' + id).remove();
          }
        }

      },
    });
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 关闭对话框
  	 * @memberof Cain
  	 * @param {String} id 关闭的ID
  	 */  
  closeDialog:function (id) {
    if (id) {
      var o = $('#' + id);
      o.hide();
      if (o.attr('data-destroy') == 'true') {
        o.remove();
      }
    }else {
      $('.cainDialog').hide();
    }

    Cain.hideOverlay({ type:'dialog' });
  },
  /**
  	 * @private
  	 * @function
  	 * @todo 初始化Alert对话框
  	 * @memberof Cain
  	 */  
  _initAlertDialog:function (param) {

    var html = '<div class="cainDialog" data-destroy="true" id="' + param.id + '" >' +
        '<div class="content">' + param.content + '</div>' +
        '<div class="btnGroup">' +
        '<a class="centerBtn">' + param.centerBtnContent + '</a>' +
        '</div></div>';
    $('body').append(html);

    $('#' + param.id).find('.centerBtn').one('click', function () {
      Cain.closeDialog(param.id);
      param.centerBtnCallBack();
    });
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 显示Alert对话框
  	 * @memberof Cain
  	 * @param {Object} 	param JSON
  	 * 				{String}  content 显示的内容
  	 *  			{Boolean} closeAutoWidth 是否关闭适应长度
  	 * 				{Boolean} isTouchNoClose 是否点击空白不关闭
  	 * 				{Function} centerBtnCallBack 点击按钮回调事件
  	 * 				{String}  centerBtnContent 按钮的描述(默认为 知道了)
  	 */
  showAlertDialog:function (param) {
    var time = new Date();

    var content = param.content || '';
    var closeAutoWidth = param.closeAutoWidth == true;
    var isTouchNoClose = param.isTouchNoClose  == true;
    var centerBtnCallBack = param.centerBtnCallBack || function () {};

    var centerBtnContent = param.centerBtnContent || '知道了';
    var id = 'cainAlertDialog' + time.getTime();

    Cain._initAlertDialog({
      content:content,
      centerBtnContent:centerBtnContent,
      centerBtnCallBack:centerBtnCallBack,
      id:id,
    });

    Cain.showDialog(id, closeAutoWidth, isTouchNoClose);
  },
  /**
  	 * @private
  	 * @function
  	 * @todo 初始化Confirm对话框
  	 * @memberof Cain
  	 */  
  _initConfirmDialog:function (param) {
    var html = '<div class="cainDialog" data-destroy="true" id="' + param.id + '" >' +
    '<div class="content">' + param.content + '</div>' +
    '<div class="btnGroup">' +
    '<a class="leftBtn">' + param.leftBtnContent + '</a>' +
    '<a class="rightBtn">' + param.rightBtnContent + '</a>' +
    '</div></div>';
    $('body').append(html);

    $('#' + param.id).find('.leftBtn').one('click', function () {
      param.leftBtnCallBack();
    });

    $('#' + param.id).find('.rightBtn').one('click', function () {
      param.rightBtnCallBack();
    });
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 显示Confirm对话框
  	 * @memberof Cain
  	 * @param {Object} 	param JSON
  	 * 				{String}  content 显示的内容
  	 *  			{Boolean} closeAutoWidth 是否关闭适应长度
  	 * 				{Boolean} isTouchNoClose 是否点击空白不关闭
  	 * 				{Function} leftBtnCallBack 左键点击按钮回调事件
  	 * 				{String}  leftBtnContent 左键按钮的描述
  	 *  * 			{Function} rightBtnCallBack 右键点击按钮回调事件
  	 * 				{String}  rightBtnContent 右键按钮的描述
  	 */
  showConfirmDialog:function (param) {
    var time = new Date();

    var content = param.content || '';
    var closeAutoWidth = param.closeAutoWidth == true;
    var isTouchNoClose = param.isTouchNoClose  == true;
    var leftBtnCallBack = param.leftBtnCallBack || function () {};

    var leftBtnContent = param.leftBtnContent || '';
    var rightBtnCallBack = param.rightBtnCallBack || function () {};

    var rightBtnContent = param.rightBtnContent || '';
    var id = 'cainConfirmDialog' + time.getTime();

    Cain._initConfirmDialog({
      content:content,
      leftBtnCallBack:leftBtnCallBack,
      leftBtnContent:leftBtnContent,
      rightBtnCallBack:rightBtnCallBack,
      rightBtnContent:rightBtnContent,
      id:id,
    });

    Cain.showDialog(id, closeAutoWidth, isTouchNoClose);
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 打开虚拟页
  	 * @memberof Cain
  	 * @param {String} id 打开的ID
  	 */  
  showVPage:function (id) {
    var that = $('#' + id);
    var height = $(window).height();
    if (window.screen.availHeight < document.body.scrollHeight) {
      height = document.body.scrollHeight ;
    }

    that.css({ 'min-height':height });
    if(window.navigator.platform.toLowerCase().indexOf('win32') == -1){
    	 $('html,body').addClass('cainVPageOverFlow');
    }
   
    that.show();
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 关闭虚拟页
  	 * @memberof Cain
  	 * @param {String} id 关闭的ID
  	 */  
  closeVPage:function (id) {
	if(window.navigator.platform.toLowerCase().indexOf('win32') == -1){
		$('html,body').removeClass('cainVPageOverFlow');
	}
    if (id) {
      $('#' + id).hide();
    }else {
      $('.cainVPage').hide();
    }
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 初始化ActionSheet
  	 * @memberof Cain
  	 * @param {Object} json  id 唯一标示
  	 * 						 hideAction 是否隐藏Action操作按钮,
  	 * 						 content:显示的内容，可以没有
  	 * 						 menu [{
  	 * 								id:'' 指定一个ID，可以为空
  	 * 								color:'' 按钮文字颜色（默认黑色）,
  	 * 								content:文本内容,
  	 * 								click:function,
  	 * 								}]
  	 */  
  initActionSheet:function (json) {
    if (!json && !json.id) {
      return;
    }

    var menu = json.menu || [];
    var hideAction = json.hideAction || false;

    if ($('#' + json.id).length != 0) {
      return;
    }
    var selfClass="cainActionSheet ";
    
    if(window.navigator.userAgent.toLowerCase().indexOf('iphone')!=-1 && window.screen.availHeight<=647){
    	selfClass+="cainActionSheet_oldIOS";
    }

    //初始化HTML
    var html = '<div id="' + json.id + '" class="'+selfClass+'">' +
    '<div class="cainActionSheet_menu"></div>';

    if (!hideAction) {
      html += '<div class="cainActionSheet_action"><div class="cainActionSheet_cell cainActionSheet_cell_cancel" >取消</div></div>';
    }

    html += '</div>';

    $('body').append(html);

    //初始化Content
    if (json.content) {
      $('#' + json.id).prepend('<div class="cainActionSheet_content">' + json.content + '</div>');
    }

    //初始化按钮组设置
    var btns = '';
    var btnArray = [];
    for (var i in menu) {
      var tId = menu[i].id || 'cainActionSheet_cell' + Cain.getUUID();
      btns += '<div id="' + tId + '" style="color:' + (menu[i].color || '#000') + '" class="cainActionSheet_cell">' + menu[i].content + '</div>';
      btnArray.push(tId);
    }

    $('#' + json.id).find('.cainActionSheet_menu').html(btns);

    for (var i in menu) {
      var fun = menu[i].click || function () {};

      $('#' + btnArray[i]).click(fun);
    }
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 显示ActionSheet
  	 * @memberof Cain
  	 * @param {Object} json  id 唯一标示
  	 */  
  showActionSheet:function (id) {
	var o='#' + id;
    if (!$(o).length) {
      return;
    }

    $('.cainActionSheet').removeClass('cainActionSheet_toggle');
    var self= $(o);
    if(self.hasClass('cainActionSheet_oldIOS')){
    	 self.show();
    	 setTimeout(function(){
    		 self.addClass('cainActionSheet_toggle');
    	 },90);
    }else{
    	self.addClass('cainActionSheet_toggle');
    }
    
    
   
    
    
    Cain.showOverlay({
    	type:'dialog',
      success:function () {
        Cain.closeActionSheet(id);
      },
    });
    $('.cainActionSheet_cell_cancel').click(function () {
      Cain.closeActionSheet(id);
    });
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 关闭ActionSheet
  	 * @memberof Cain
  	 * @param {Object} json  id 唯一标示
  	 */  
  closeActionSheet:function (id) {
	var o='.cainActionSheet'
	if(id){
		o= "#"+id
	}
    $(o).removeClass('cainActionSheet_toggle');
    
    var self= $(o);
    if(self.hasClass('cainActionSheet_oldIOS')){
    	 setTimeout(function(){
    	    	$('#'+id).hide();
    	    },500);
    }else{
    	
    }
   
    Cain.hideOverlay({type:'dialog'});
  },
  /**
	 * @public
	 * @function
	 * @todo 销毁ActionSheet
	 * @memberof Cain
	 * @param {Object} json  id 唯一标示
	 */ 
  destroyActionSheet:function (id) {
	  var o='.cainActionSheet'
	  if(id){
		 o= "#"+id
	  }
	$(o).remove();
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 显示Toast
  	 * @memberof Cain
  	 * @param {Object} json
  	 * 						content 提示内容
  	 * 						color 字体颜色
  	 * 						background 背景颜色
  	 * 						position 'bottom','center','top' 默认'bottom'
  	 * 						timeout 默认2000ms
  	 */  
  showToast:function (json) {
    if (!json) {
      return;
    }

    var t = json.timeout || 2000;
    var p = json.position || 'bottom';
    var sp = '';
    if (json.position == 'bottom') {
      sp = 'bottom: 15%;';
    }else if (json.position == 'center') {
      sp = 'top: 49%;';
    }else if (json.position == 'top') {
      sp = 'top: 15%;';
    }else {
      sp = 'bottom: 15%;';
    }

    var html = '<div class="cainToast" style="color:' + (json.color || '#fff') + ';background-color:' + (json.background || '#93c47d') + ';' + sp + '">' + json.content + '</div>';
    $('body').append(html);
    var left = ($('.cainToast').width()+20) / 2 - 10;
    var right = Math.abs(left) / 2 
    $('.cainToast').css({ 'margin-left': '-' + left+ 'px' ,'margin-right': right+ 'px'}).addClass('cainToast_toggle');
    setTimeout(function () {
    	
      $('.cainToast').removeClass('cainToast_toggle');
      setTimeout(function () {$('.cainToast').remove();}, 500);
      
    }, t);
  },
  
  /**
  	 * @public
  	 * @function
  	 * @todo 获取Url中的值，如果没有再从localstorage,sessionstorage依次获取值
  	 * @memberof Cain
  	 * @param {String} name key的名字
  	 */  
  getParam:function (name) {
    return Cain.getUrlParam(name) || localStorage.getItem(name) || sessionStorage.getItem(name);
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 获取Url中的值
  	 * @memberof Cain
  	 * @param {String} name key的名字
  	 */  
  getUrlParam:function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);

      //	    	 return  unescape(r[2]);
    }

    return null;
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 对日期进行格式化
  	 * @memberof Cain
  	 * @param {Date} date 要格式化的日期
  	 * @param {String} format 进行格式化的模式字符串
  	 *     支持的模式字母有：
  	 *     y:年,
  	 *     M:年中的月份(1-12),
  	 *     d:月份中的天(1-31),
  	 *     h:小时(0-23),
  	 *     m:分(0-59),
  	 *     s:秒(0-59),
  	 *     S:毫秒(0-999),
  	 *     q:季度(1-4)
  	 */  
  formatDate: function (date, format) {
	
	if(typeof date == 'string' && Cain.getDeviceType() == 'ios'){
		if(date.substring(0,date.lastIndexOf(".")) != ''){
			date=date.substring(0,date.lastIndexOf("."));
		}
		date=date.replace(/-/g,'/');
	}
	
    date = new Date(date);
    var map = {
      M: date.getMonth() + 1, //月份
      d: date.getDate(), //日
      h: date.getHours(), //小时
      m: date.getMinutes(), //分
      s: date.getSeconds(), //秒
      q: Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
      var v = map[t];
      if (v !== undefined) {
        if (all.length > 1) {
          v = '0' + v;
          v = v.substr(v.length - 2);
        }

        return v;
      } else if (t === 'y') {
        return (date.getFullYear() + '').substr(4 - all.length);
      }

      return all;
    });

    return format;
  },
  /**
	 * @public
	 * @function
	 * @todo 获取设备类型
	 * @memberof Cain
	 */  
  getDeviceType:function(){
	  var ua = navigator.userAgent.toLowerCase();	
		if (/iphone|ipad|ipod/.test(ua)) {
			  return 'ios'		
		} else if (/android/.test(ua)) {
			return "android";	
		}  
  },

  /**
  	 * @public
  	 * @function
  	 * @todo 判断是否为空
  	 * @memberof Cain
  	 * @param {Object} obj 需要校验对象
  	 */  
  isNullOrEmpty:function (obj) {
	if (obj == undefined || obj == null || obj == 'null' || obj == '' || obj.length == 0 ) {
      return true;
    }else {
      return false;
    }
  },
  /**
  	 * @function getUUID
  	 * @memberof Cain
  	 * @public
  	 * @todo 生成UUID
  	 */
  getUUID: function () {
    Cain.getUUID.random4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    return (Cain.getUUID.random4() + Cain.getUUID.random4() + '-' + Cain.getUUID.random4() + '-' + Cain.getUUID.random4() + '-' + Cain.getUUID.random4() + '-' + Cain.getUUID.random4() + Cain.getUUID.random4() + Cain.getUUID.random4());
  },
  /**
  	 * @public
  	 * @function
  	 * @todo 生日转换为年龄
  	 * @memberof Cain
  	 * @param {String} birthday 日期格式为"2000-01-01"
  	 */
  brithdayConAges:function (strBirthday) {
    if (!strBirthday) {
      return 0;
    }

    var returnAge;
    var strBirthdayArr = strBirthday.split('-');
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear){
      returnAge = 0;//同年 则为0岁
    }else{
    	var ageDiff = nowYear - birthYear; //年之差
    	if (ageDiff > 0){
		    if (nowMonth == birthMonth){
		      var dayDiff = nowDay - birthDay;//日之差
		      if (dayDiff < 0){
		        returnAge = ageDiff - 1;
		      }else{
		    	  returnAge = ageDiff;
		      }
		    }else{
		    	  var monthDiff = nowMonth - birthMonth;//月之差
				  if (monthDiff < 0){
				    returnAge = ageDiff - 1;
				  }else{
					  returnAge = ageDiff;
				  }
			}
	  }else{
	  returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
	  }
   }

    return returnAge;//返回周岁年龄
  },
  /**
	 * @public
	 * @function
	 * @todo  格式化Form数据为Json
	 * @memberof Cain
	 * @param {String} that formId
	 */
  serializeJson:function(that){
	  var self=$("#"+that);
	  var serializeObj={};  
      var array=self.serializeArray();  
      var str=self.serialize();  
      $(array).each(function(){  
          if(serializeObj[this.name]){  
              if($.isArray(serializeObj[this.name])){  
                  serializeObj[this.name].push(this.value);  
              }else{  
                  serializeObj[this.name]=[serializeObj[this.name],this.value];  
              }  
          }else{  
              serializeObj[this.name]=this.value;   
          }  
      });  
      return serializeObj;  
  }

};
$(document).ready(function () {
  Cain.init();
});
