var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};//создаем второе св-во объекта. Будет хранить все классы(функции конструткоры и их прототипы), которые создают instances
App.data = {};

App.classes.ProductList = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
	var $root = $(element);//создаем jquery объект и кладем его в переменную, на основе element для каждого instance 
	//console.log(element);
	//console.log($root);
	//this ссылка на instance(объект созданный на основе функции конструткор)
	this.data = null; //this.data это св-во instance в которое мы будем класть данные, полученные с сервера
	this.elements = { //в этом св-ве мы будем хранить все элементы, с которыми мы будем работать в рамках рута
		$root: $root,//в св-во объекта this.elements мы записывает значение переменной $root, далее мы сможем обращаться к этой переменной через this.elements.$root
		$navItem: $('[data-id]'),
		$window: $(window)
	};

	this.category = App.instances.Nav[0].category;
	this.init();//есть цепочка прототипов, и если этот метод не существует в объекте, он берется из прототипа, и так ниже.
//instance создается в цикле в самовызывающейся ф-ции(описано внизу стр-цы)
};
//метод init используется для того, чтобы вызывать другие методы 
App.classes.ProductList.prototype.init = function() {//запись в прототип этого метода
	if (!App.data.products) {
		this.getProducts();
	} else {
		this.getCurrentProducts(App.data.products);
	}
};

App.classes.ProductList.prototype.getCategory = function(event) {
	var target = event.target;
	this.category = $(target).data('id');
};

App.classes.ProductList.prototype.getProducts = function() {
	var _this = this;

	$.ajax({
		url: '/Myauction/services/products.json',
		dataType: 'json',
		method: 'GET',
		success: function(data) {
			App.data.products = data;
			_this.getCurrentProducts(data);
		},
		error: function(jqXHR) {
			_this.render(jqXHR, true);
		}
	});
};

App.classes.ProductList.prototype.getCurrentProducts = function(data) {
	var _this = this;

	var filtered = {};

	filtered.items = data.items.filter(function(product) {
		return product.category.toLowerCase() == _this.category.toLowerCase();
	});

	if (filtered.items.length) {
		this.render(filtered);
	} else {
		this.render(filtered, false, true);
	}
};

App.classes.ProductList.prototype.render = function(data, isError, isEmpty) {
	var template;
	if (isError) {//если isError будет true, то будет выполняться это, если нет, то другая часть услоной конструкции
		template = App.templates.error(data);// здесь используется hbs шаблон error
		this.elements.$root.html(template);//html метод jquery объекта. Он вставляет, как html переданный ему параметр
	} else if (isEmpty) {
		this.elements.$root.html('<div>No items</div>');
	} else {
		template = App.templates['product-list'](data);
		this.elements.$root.html(template);
	}
};


