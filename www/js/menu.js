'use strict';
/**
 * @todo 菜单
 * @namespace Menu
 * @author haze.liu
 * @since 2016年10月21日 17:34:22
 */
var Menu = {
  /**
	* @public
	* @function
	* @todo 初始化
	* @memberof Menu
	*
	*/
   init:function () {
	   Menu.initTool();
	   Menu.initDOM();
	   Menu.initEvent();
   },
  /**
	* @public
	* @function
	* @todo 初始化DOM
	* @memberof Menu
	*
	*/
  initDOM:function () {
  },
  /**
	* @public
	* @function
	* @todo 初始化工具
	* @memberof Menu
	*
	*/
  initTool:function () {
	  
	  
  },
  /**
	* @public
	* @function
	* @todo 初始化事件
	* @memberof Menu
	*
	*/		
  initEvent:function () {
  	$('.buttonGroup ').on('click', 'div', function(event) {
  		Menu.menuClick(this);
  	});
  },
    /**
	* @public
	* @function
	* @todo 点击菜单事件
	* @memberof Menu
	*
	*/	
  menuClick:function(self){
  	$(self).nextAll().animateCss('zoomOutDown');
  	$(self).prevAll().animateCss('zoomOutUp');
	$(self).animateCss('zoomOutRight',function(){
		var id=$(self).attr('id');
		var param={};
		if(id=='rock'){
			var one={
				content:'',
				type:'rock',
				id:Cain.getUUID(),
			}
			DB.setOne(one);
		}else if(id == 'saySomething'){
			param.type="saySomething";
		}
		$.pjax('load','list',param);
	});
  }
  
};
