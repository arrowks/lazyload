(function($){
	$.fn.scrollLoading = functin(options){

		var defaults = {
			//img上的data-url属性
			attr:"data-url",
			//父元素 默认为window
			container:window,
			//回调函数
			callback:$.noop
		};
		//合并对象
		var params = $.extend({},defaults,options||{});
		//将父元素转化为jquery对象
		var container = $(params.container);
		//定义一个数组保存元素属性值
		params.cache = [];
		//遍历每一个元素
		$(this).each(function(){
			//获取元素属性类型和和url的值
			var node = this.nodeName.toLowerCase(),url = $(this).attr(params["attr"]);
			//定义一个对象保存属性
			var data = {
				obj:$(this),
				tag:node,
				url:url
			};

			params.cache.push(data);
		});
			var callback = function(call){
				if($.isFunction(params.callback)){
					params.callback.call(call);
				}
			};
			//每次触发滚动事件时，对每个dom元素与container元素进行位置判断，如果满足条件，就把路径赋予这个dom元素！
			var loading = function(){
				//获取父元素的高度和宽度
				var contHeight = container.outerHeight();
				var contWidth = container.outerWidth();

				if(container.get(0) === window){
					//如果父元素为window 没有offset方法
					var contop = $(window).scrollTop();
					var conleft = $(window).csrollLeft();
				}else{
					var contop = container.offset().top;
					var conleft = container.offset().left;
				}
			}
			$.each(params.cache,function(i,data){
				var o = data.obj,tag = data.tag,url = data.url,post,posb,posl,posr;
				if(o){
					//对象顶部与文档顶部之间的距离，如果它小于父元素底部与文档顶部的距离，则说明垂直方向上已经进入可视区域了；
					post = o.offset().top - (contop + contHeight);
					//对象底部与文档顶部之间的距离，如果它大于父元素顶部与文档顶部的距离，则说明垂直方向上已经进入可视区域了；
					posb = o.offset().top + .height() - contop;
					//原理同上
					posl = o.offset().left - (conleft - contWidth); 
					posr = offset().top + o.width() - conleft;
					//必须满足所有条件才会添加url的值
					if(o.is(':visible') && (post < 0 && psb > 0) && (posl < 0 && posr > 0)){
						if(url){
							if(tag === "img"){
								callback(o.attr("src",url));
							}else{
								callback(o.css("background-image","url("+url+")"));
							}
						}else{
							callback(o);
						}
						data.obj = null;
					}
				}
			});
	};
	loading();
	container.bind("scroll",loading);
})(jQuery);