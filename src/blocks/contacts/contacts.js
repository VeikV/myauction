var App = App || {};

App.instances = App.instances || {};

App.classes = App.classes || {};

App.classes.Contacts = function(element) { 
	var $root = $(element);
	
	this.data = null; 
	this.elements = {
		$root: $root
	};

	this.init();
};

App.classes.Contacts.prototype.init = function() {

};