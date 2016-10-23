'use strict';
/**
 * @todo DB
 * @namespace DB
 * @author haze.liu
 * @since 2016年10月22日 14:34:22
 */
var DB = {
	KEY:'babyRock',
	/**
	* @public
	* @function
	* @todo 保存一个
	* @memberof DB
	*
	*/	
	setOne:function(one){
		var all=DB.getAll();
		one.date=new Date().getTime();
		all.push(one);
		DB.setAll(all);
	},
	/**
	* @public
	* @function
	* @todo 获取一个
	* @memberof DB
	*
	*/	
	getOne:function(id){
		var all=DB.getAll();
		var res={};
		if(!Cain.isNullOrEmpty(all)){
			for(var i in all){
				if(all[i].id == id ){
					res=all[i];
					break;
				}
			}
		}
		return res;
	},
	/**
	* @public
	* @function
	* @todo 获取所有
	* @memberof DB
	*
	*/	
	getAll:function(){
		if(Cain.getParam(DB.KEY)){
			return JSON.parse(Cain.getParam(DB.KEY));
		}
		return [];
	},
	/**
	* @public
	* @function
	* @todo 获取所有
	* @memberof DB
	*
	*/
	setAll:function(all){
		localStorage.setItem(DB.KEY,JSON.stringify(all));
	},


  
};
