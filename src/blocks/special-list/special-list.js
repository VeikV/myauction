var App = App || {};

App.instances = App.instances || {};

App.classes = App.classes || {};

App.classes.SpecialList = function(element) {
	var $root = $(element);
	this.data = null; 
	this.elements = {
		$root: $root,
		$window: $(window)
	};

	this.init();
};

App.classes.SpecialList.prototype.init = function() {
 	if (!App.data.products) {
 		this.getProducts();
 	} else {
 		this.render(App.data.products);
 	}
};

App.classes.SpecialList.prototype.getProducts = function() {

	var _this = this; 

	$.ajax({
		url: '/Myauction/services/products.json',
		dataType: 'json',
		method: 'GET',
		success: function(data) {
			App.data.products = data;
			_this.render(data);

		},
		error: function(jqXHR) {
			_this.render(jqXHR, true);
		}
	});
};

App.classes.SpecialList.prototype.render = function(data, isError) {
	var template;

	if (isError) {
		template = App.templates.error(data);
		this.elements.$root.html(template);
	} else {
		template = App.templates['special-list'](data);
		this.elements.$root.html(template);
		this.carusel();
		this.attachEvents();
		this.elements.$root.find('.slick-arrow').fadeOut();
	}
};

App.classes.SpecialList.prototype.carusel = function() {
	this.elements.$root.slick({
	 lazyLoad: 'ondemand',
	 slidesToShow: 4,
	 slidesToScroll: 1,
	 variableWidth: true
	});
};

App.classes.SpecialList.prototype.attachEvents = function() {
	this.elements.$root.on('mouseenter mouseleave', this.fadeOut.bind(this));
};

App.classes.SpecialList.prototype.fadeOut = function() {
	this.elements.$root.find('.slick-arrow').fadeToggle();
};












