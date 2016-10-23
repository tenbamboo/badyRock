'use strict';
/**
 * @todo 菜单
 * @namespace List
 * @author haze.liu
 * @since 2016年10月22日 15:34:22
 */
var List = {
	myScroll:null,
	resetFlag:true,
	count:0,
  /**
	* @public
	* @function
	* @todo 初始化
	* @memberof List
	*
	*/
   init:function () {
   	List.count=0;
   	List.resetFlag= true;
   	   List.myScroll=null;
	   List.initTool();
	   List.initDOM();
	   List.initEvent();
   },
  /**
	* @public
	* @function
	* @todo 初始化DOM
	* @memberof List
	*
	*/
  initDOM:function () {
  	List.getList();
  	List.initView();
  },
  /**
	* @public
	* @function
	* @todo 初始化工具
	* @memberof List
	*
	*/
  initTool:function () {
	  List.initTemplate();
	  List.myScroll = new IScroll('.iscrollContainer', {
		      scrollbars: true,
		      mouseWheel: true,
		      interactiveScrollbars: true,
		      shrinkScrollbars: 'scale',
		      fadeScrollbars: true,
		      click: true,
		});

	  List.myScroll.on('scrollEnd',function(){
	  	if(this.directionY == 1 && List.resetFlag == true){ //下
	  		$('.iscrollContainer').css({'top':'0px'});
	  		$('.circleWrap').hide();
	  		List.myScroll.refresh();
	  		List.resetFlag= false;
	  	}else if(this.directionY == -1 && this.y ==0){ //上
	  		 List.resetFlag= true;
	  		$('.circleWrap').show();
			$('.iscrollContainer').css({'top':'300px'});
	  	}
	  })

  },
  /**
  	* @public
  	* @function
  	* @todo 初始化模板
  	* @memberof Index
  	*
  	*/
  initTemplate:function () {

  	 template.helper('contentFormat', function (n) {
  	 	var content=n.content;
  	 	if(n.type=="rock"){
  	 		content='毛豆Rock了下';
  	 		List.count++;
  	 	}
  	 	return content;
    });
 	template.helper('dateFormat', function (date) {
 		return Cain.formatDate(date,'yyyy-MM-dd hh:mm:ss');
 	});
  },
  /**
	* @public
	* @function
	* @todo 初始化事件
	* @memberof List
	*
	*/		
  initEvent:function () {
  	$('.leftBtn').click(function(){
  		Cain.closeDialog();
  	});
  	$('#submitBtn').click(function(){
  		List.saveData();
  	});
  },
  /**
	* @public
	* @function
	* @todo 初始化视图
	* @memberof List
	*
	*/	
  initView:function(){
  	if(Cain.getParam('type') == 'saySomething'){
  		Cain.showDialog('inputDialog',false,true);
  	}
  },
   /**
	* @public
	* @function
	* @todo 保存数据
	* @memberof List
	*
	*/
  saveData:function(){
  	if(Cain.isNullOrEmpty($('#saySome').val())){
  		return;
  	}
  	var one={
		content:$('#saySome').val(),
		type:'saySome',
		id:Cain.getUUID(),
	}
	DB.setOne(one);
  	Cain.closeDialog();
  	List.getList();
  },
    /**
	* @public
	* @function
	* @todo 获取数据
	* @memberof List
	*
	*/	
  getList:function(){
  	 var all=DB.getAll();
      List.count=0;
  	 if(!Cain.isNullOrEmpty(all)){
  	 	$('.recordList').html(template('recordList_template',{list:all}));
  	 	List.myScroll.refresh();
		$("#count").html(List.count+'次');
  	 	
  	 }
  	 
  },
  
};
