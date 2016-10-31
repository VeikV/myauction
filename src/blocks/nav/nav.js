var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};//создаем второе св-во объекта. Будет хранить все классы(функции конструткоры и их прототипы), которые создают instances


App.classes.Nav = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
	var $root = $(element);//создаем jquery объект и кладем его в переменную, на основе element для каждого instance 
	//console.log(element);
	//console.log($root);
	//this ссылка на instance(объект созданный на основе функции конструткор)
	this.data = null; //this.data это св-во instance в которое мы будем класть данные, полученные с сервера
	this.elements = { //в этом св-ве мы будем хранить все элементы, с которыми мы будем работать в рамках рута
		$root: $root,
		$link: $root.find('.nav__item-link, .category__link')
	};

	this.url = '/myauction/build/';
	this.category = null;

	this.attachEvents();
	//console.log(this.elements.$root);
	this.init();//есть цепочка прототипов, и если этот метод не существует в объекте, он берется из прототипа, и так ниже.
//instance создается в цикле в самовызывающейся ф-ции(описано внизу стр-цы)
};
//метод init используется для того, чтобы вызывать другие методы 
App.classes.Nav.prototype.init = function() {//запись в прототип этого метода
	
};

App.classes.Nav.prototype.attachEvents = function() {
	this.elements.$root.on('click', this.elements.$link, this.getUrl.bind(this));//В руте при клике на этот эл-нт вызывается этот метод
};

App.classes.Nav.prototype.getUrl = function(event) {
	event.preventDefault();

	var $current = $(event.target);
	$current = $current.is('.nav__item-link, .category__link') ? $current : $current.closest('.nav__item-link, .category__link');
	var id = $current.data('id');
	console.log($current);
	var currentUrl = this.url + id;

	this.category = id;

	this.go(currentUrl);
};

App.classes.Nav.prototype.go = function(currentUrl) {
	$.router.go(currentUrl);
};





