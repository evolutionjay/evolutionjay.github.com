;(function($) {
	var namespace = "jaygrid";
	var methods = {
		init:function(options) {
			//init fn start
			return this.each(function() {
				var $this = $(this),
				data = $this.data(namespace);
				if (!data) {
					//start my plugin
				}
			});
		},
		update:function(content) {
			//update the grid if your add something
			return this.each(function () {
				var $this = $(this),
					data = $this.data();
				if (data == namespace) {
					//start my update
				}
			});
		},
		destroy:function() {
			//destroy
		}
	};
	
	
	if (methods[method]) {
		return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	} else if (typeof method === "object" || !method) {
		return methods.init.apply(this, arguments);
	} else {
		$.error("Method" + method + "does not exist on jQuery.tooltip");
	}
	
	
	$.fn.jayPlugin = function(methods) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === "object" || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error("Method" + method + "does not exist on this plugin");
		}
	};
})(jQuery);