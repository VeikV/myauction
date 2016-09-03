var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта

App.classes = App.classes || {};//создаем второе св-во объекта

//в App.classes будут храниться все классы, те классы это функции конструкторы и их прототипы

App.classes.ProductList = function(element) {
	var $root = $(element);

	this.data = null;
	this.elements = {
		$root: $root
	};
	//console.log(this.elements.$root);
	this.init();//есть цепочка прототипов, и если этот метод не существует в объекте, он берется из прототипа, и так ниже.

};

App.classes.ProductList.prototype.init = function() {

}

;(function() {
	var elements = $('.product-list');
	App.instances['product-lists'] = [];

	for(var i = 0; i < elements.length; i++) {
		
		App.instances['product-lists'].push(new App.classes.ProductList(elements[i]));
	}
})();