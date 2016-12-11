var App = App || {};

App.instances = App.instances || {};

App.classes = App.classes || {};


App.classes.Nav = function(element) { 
	console.log(element);
	var $root = $(element);
	this.data = null; 

	this.elements = { 
		$root: $root,
		$link: $root.find('.nav__item-link, .category__link')
	};

	this.url = '/myauction/build/';
	this.category = null;

	this.attachEvents();
	this.init();
};

App.classes.Nav.prototype.init = function() {
	
};

App.classes.Nav.prototype.attachEvents = function() {
	this.elements.$root.on('click', this.elements.$link, this.getUrl.bind(this));
};

App.classes.Nav.prototype.getUrl = function(event) {
	event.preventDefault();

	var $current = $(event.target);
	$current = $current.is('.nav__item-link, .category__link') ? $current : $current.closest('.nav__item-link, .category__link');
	var id = $current.data('id');
	var currentUrl = this.url + id;

	this.elements.$link.removeClass('active');

	if(!this.elements.$link.hasClass('active')) {
		$current.addClass('active');
	}

	this.category = id;

	this.go(currentUrl);
};

App.classes.Nav.prototype.go = function(currentUrl) {
	$.router.go(currentUrl);
};





