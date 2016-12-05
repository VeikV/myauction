var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};//создаем второе св-во объекта. Будет хранить все классы(функции конструткоры и их прототипы), которые создают instances
App.data = {};

//в App.classes будут храниться все классы, те классы это функции конструкторы и их прототипы

App.classes.SpecialList = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
	var $root = $(element);//создаем jquery объект и кладем его в переменную, на основе element для каждого instance 	//this ссылка на instance(объект созданный на основе функции конструткор)
	this.data = null; //this.data это св-во instance в которое мы будем класть данные, полученные с сервера
	this.elements = {
		$root: $root,
		$window: $(window)
	};

	this.init();//есть цепочка прототипов, и если этот метод не существует в объекте, он берется из прототипа, и так ниже.
//instance создается в цикле в самовызывающейся ф-ции(описано внизу стр-цы)
};

App.classes.SpecialList.prototype.init = function() {//запись в прототип этого метода
 	if (!App.data.products) {
 		this.getProducts();
 	} else {
 		this.render(App.data.products);
 	}
};

App.classes.SpecialList.prototype.getProducts = function() {

	var _this = this; //сохраняем контекст в переменную, потому что в аяксе this будет ссылаться не на instance, а на ajax объект

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

	if (isError) {//если isError будет true, то будет выполняться это, если нет, то другая часть услоной конструкции
		template = App.templates.error(data);// здесь используется hbs шаблон error
		this.elements.$root.html(template);//html метод jquery объекта. Он вставляет, как html переданный ему параметр
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












