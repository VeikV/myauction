var App = App || {};

App.instances = App.instances || {};
App.classes = App.classes || {};

App.classes.mainSlider = function(element) { 
	var $root = $(element);
	this.data = null; 
	this.elements = { 
		$root: $root 
	};
	this.init();
};

App.classes.mainSlider.prototype.init = function() {
	this.slider();
};

App.classes.mainSlider.prototype.slider = function() {
	this.elements.$root.slick({
		autoplay: true,
  		autoplaySpeed: 2500,
  		fade: true,
  		cssEase: 'linear'
	});
};
