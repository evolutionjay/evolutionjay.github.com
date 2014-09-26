;(function($){
	$.fn.smgSelect = function(options) {
		var opt = $.extend({
			fixcalcNum:0,			//修正距离最底部的偏移量 (Number)
			defText:"请选择",		//配置默认参数
			wrapClass:"",			//包裹的样式
			afselect:null			//选择东西的时候执行 callback
		},options);
		var doc = $(document); 
		return this.each(function(){
			var _self;
			var smshCLS;
			var smtx;
			var smlt;
			var smlit;
			var selectText;
			var selectList;
			var inputCache;
			var val;
			
			_self = $(this);
			smshCLS = "smgSelectShow";
			smtx = ".smgSelectText";
			smlt = ".smgSelectListWrap";
			smlit = ".smgIthems";
			selectText = _self.find(smtx);
			selectList = _self.find(smlt);
			inputCache = _self.find("input");
			
			function closeSelect() {
				$(".smgSelectWrap").removeClass(smshCLS);
				$(smlt).hide(0).removeAttr('style');
				doc.unbind("click.closeSelect");
			}
			function ulposition() {
				selectList.removeClass("showup");
				var uloffsetTop = selectList.offset().top;
				if ( uloffsetTop + selectList.height()+opt.fixcalcNum > doc.height() ) {
					selectList.addClass("showup");
				} else {
					selectList.removeClass("showup");
				}
			}
			function toggleSelect(_self) {
				var smglist = $(smlt);
				var smglistVist = smglist.filter(function(){
					if ($(this).is(":visible")){
						return this;
					}
				});
				if ( smglistVist[0] == selectList[0] ) {
					selectList.hide(0);
					smglistVist.parent().removeClass(smshCLS);
				} else {
					smglistVist.hide(0);
					smglistVist.parent().removeClass(smshCLS);
					_self.addClass(smshCLS);
					selectList.show(0);
					ulposition();
				}
			}
			if (opt.defText) {
				var smgDefText = opt.defText;
				selectText.text(opt.defText);
			}
			selectText.on("click", function(e){
				e.stopPropagation();
				doc.bind("click.closeSelect", function() {
					closeSelect();
				});
				toggleSelect(_self);
			});
			_self.on("click", function(e) {
				e.stopPropagation();
			});
			selectList.on("click", smlit, function(e) {
				var _this = $(this);
				var _text = _this.text();
				val = _this.attr("val");
				selectText.text(_text).attr("title", _text);
				_this.addClass("act").siblings().removeClass("act");
				_self.attr("val", val);
				inputCache.val(val);
				if ( opt.afselect ) {
					opt.afselect(val, _self);
				}
				closeSelect();
			});
		});
	};
	$.fn.smgSelectReset = function(options) {
		var opt = $.extend({
			defWrap:".smgSelectWrap",
			defText:".smgSelectText",
			defLWrp:".smgSelectListWrap"
		}, options);
		$(document).trigger("click");
		return this.each(function() {
			var _self = $(this);
			_self.removeAttr("val");
			_self.find(opt.defText).text(smgDefText);
		});
	};
})(jQuery);