//处理window 最小高度。 这里不用 html ,body {height:100%} 而转用Javascript 是为了 在pad上的体验
//winheight_fn
winMinheight = function(win, scalcNum,autoBody) {
	var minheightNum;
	var styles;
	var ghostElem;
	var isatbd = "";
	var atbd = autoBody || false;
	var snum = scalcNum || [0];
	minheightNum = win.height();
	if ( atbd === true ) {
		isatbd = "height:auto";
	}
	/* Example(定义高度例子):***************

	var scalcNum = [
		["wraps",100],
		["hello",40]
	];
	
	**************************************/
	
	
	var snuml = snum.length;
	var snums = "";
	for (var i = 0; i < snuml; i++) {
		var _a = Number(minheightNum-snum[i][1]);
		snums = snums + '.height_s_'+ snum[i][0] + '{height:'+_a+'px}' + 
		'.height_min_'+ snum[i][0] + '{min-height:'+_a+'px}' +
		'.height_max_'+ snum[i][0] + '{max-height:'+_a+'px; _height:'+_a+'px;}';
	}
	//console.log(snum[0])
	ghostElem = $("<div>").attr("id", "jay-layout-css").css('display', 'none');
	styles = 
		'<style type="text/css">\n' + 
			'.winminheight {\n' + 
			'min-height:' + minheightNum + 'px;\n' + 
			'_height:' + minheightNum + 'px;\n' + 
		'}\n' + 
			'.winheight {\n' + 
			'height:' + minheightNum + 'px;\n' + 
		'}\n' + 
		snums +
		'html,body {\n'+
			isatbd +'\n' +
		'}\n'+
		'</style>';
	ghostElem.html(styles);
	var ghostTemp = document.getElementById("jay-layout-css");
	if (ghostTemp) {
		$(ghostTemp).html(styles);
	} else {
		$('body').prepend(ghostElem);
	}
};

//jQuery Plug-ins
;(function($) { //按钮的兼容样式状态
	$.fn.btnStyle = function(options) {
		var opt = $.extend({
			mainClsInx: 1,
			//指定主样式是在第几个样式
			add_h_cls: "_hover",
			//指定主样式后面增加的样式名 hover状态
			add_a_cls: "_active" //指定主样式后面增加的样式名	active状态
		},
		options);
		return this.each(function(i, el) {
			var $self, selfClass, hoverClass, activeClass;
			$self = $(el);
			selfClass = $self.attr("class").split(" ")[opt.mainClsInx];
			hoverClass = selfClass + opt.add_h_cls;
			activeClass = selfClass + opt.add_a_cls;
			$self.on("mouseover",
			function(e) {
				$self.addClass(hoverClass);
			}).on("mousedown",
			function(e) {
				$self.addClass(activeClass);
			}).on("mouseup",
			function(e) {
				$self.removeClass(activeClass);
			}).on("mouseout",
			function(e) {
				$self.removeClass(hoverClass + " " + activeClass);
			});
		});
	}; //input焦点状态美化。
	$.fn.inputfocus = function(options) {
		var opt = $.extend({
			mainClsInx: 0,
			selfIsWrapp: false,
			add_w_cls: "_wrap",
			add_h_cls: "_hover",
			add_f_cls: "_focus",
			add_e_cls: "_error",
			add_ro_cls: "_readonly",
			afcreate: "",
			affocus: "",
			afblur: "",
			afout: "",
			afhover: ""
		},
		options);
		return this.each(function(index, el) {
			var $self, $el, selfClass, wrapClass, hoverClass, focusClass, errorClass, readonlyClass;
			$el = $(el);
			if ($el.data("ardinput")) { //console.log("object allready");
				return;
			} else {
				$el.data("ardinput", true);
			}
			selfClass = $el.attr("class").split(" ")[opt.mainClsInx];
			wrapClass = selfClass + opt.add_w_cls;
			hoverClass = selfClass + opt.add_h_cls;
			focusClass = selfClass + opt.add_f_cls;
			errorClass = selfClass + opt.add_e_cls;
			readonlyClass = selfClass + opt.add_ro_cls;
			$self = $el.closest("." + wrapClass);
			if ($el.attr("readonly")) {
				$self.addClass(readonlyClass);
				return;
			}
			$el.on("mouseover",
			function() {
				$self.addClass(hoverClass);
				if (opt.afhover) {
					opt.afhover($self, $el);
				}
			}).on("blur",
			function() {
				$self.removeClass(hoverClass + " " + focusClass + " " + errorClass);
				if (opt.afblur) {
					opt.afblur($self, $el);
				}
			}).on("mouseout",
			function() {
				$self.removeClass(hoverClass);
				if (opt.afout) {
					opt.afout($self, $el);
				}
			}).on("focus",
			function() {
				$self.addClass(focusClass).removeClass(errorClass);
				if (opt.affocus) {
					opt.affocus($self, $el);
				}
			});
			if (opt.afcreate) {
				opt.afcreate($self, $el);
			}
		});
	};
	
	
	//tabs fn
	$.fn.Tabs=function(options){
		// 处理参数
		options = $.extend({
			event : 'click',		//事件类型  
			timeout : 0,			//设置事件延迟
			auto : 0,				//多少秒自动切换一次  
			tabBoxLayout:"div",		//tabBox的子集
			findInSelf:false,		//用于元素都是处于同个HTML tag里面的时候调用方法
			callback : null			//回调函数
		}, options);
		return this.each(function() {
			if (options.findInSelf===true) {
				var self = $(this);
				var baseClass = self.attr("class").split(" ")[0];
				var tabClass = baseClass + "_tab";
				var conClass = baseClass + "_tabbox";
				//--
				var tabBox = self.find("."+conClass).children( options.tabBoxLayout );
				var menu = self.find("."+tabClass);
				var items = menu.find( '.iTab' );
				var timer;
			} else {
				var self = $(this),
					selfboxID = $(this).attr("class").split(" ")[0] + '_tabbox',
					tabBox = $( '#' + selfboxID ).children( options.tabBoxLayout ),
					menu = self,
					items = menu.find( '.iTab' ),
					timer;
			}
			
			tabBox.eq(items.filter(".cur").index()).removeClass("hide");

			var tabHandle = function( elem ){
					elem.siblings( '.iTab' )
						.removeClass( 'cur' )
						.end()
						.addClass( 'cur' );

					tabBox.siblings( options.tabBoxLayout )
						.addClass( 'hide' )
						.end()
						.eq( elem.index() )
						.removeClass( 'hide' );
				},

				delay = function( elem, time ){
					time ? setTimeout(function(){ tabHandle( elem ); }, time) : tabHandle( elem );
				},

				start = function(){
					if( !options.auto ) return;
					timer = setInterval( autoRun, options.auto );
				},

				autoRun = function(){
					var current = menu.find( '.cur' ),
						firstItem = items.eq(0),
						len = items.length,
						index = current.index() + 1,
						item = index === len ? firstItem : current.next( '.iTab' ),
						i = index === len ? 0 : index;

					current.removeClass( 'cur' );
					item.addClass( 'cur' );

					tabBox.siblings( options.tabBoxLayout )
						.addClass( 'hide' )
						.end()
						.eq(i)
						.removeClass( 'hide' );
				};

			items.bind( options.event, function(){
				delay( $(this), options.timeout );
				var _this = $(this);
				if( options.callback ){
					options.callback( self,_this );
				}
			});

			if( options.auto ){
				start();
				self.hover(function(){
					clearInterval( timer );
					timer = undefined;
				},function(){
					start();
				});
			}
		});
	};	
})(jQuery);