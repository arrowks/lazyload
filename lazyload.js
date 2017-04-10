(function($){
	$.fn.scrollLoading = functin(options){

		var defaults = {
			attr:"data-url",
			container:window,
			callback:$.noop
		};
		var params = $.extend({},defaults,options||{});

		var container = $(params.container);

		params.cache = [];

		$(this).each(function(){
			var node = this.nodeName.toLowerCase(),url = $(this).attr(params["attr"]);

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
		
			var loading = function(){
				var contHeight = container.outerHeight();
				var contWidth = container.outerWidth();

				if(container.get(0) === window){
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
					post = o.offset().top - (contop + contHeight);
					posb = o.offset().top + .height() - contop;

					posl = o.offset().left - (conleft - contWidth); 
					posr = offset().top + o.width() - conleft;

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