

setTimeout(function() {//создает ассинхронный поток кода, делаем для того, что бы оно работало после того, как проинициализируются все компонеты(предыдущие js файлы)

	$.router.add('/myauction/build/', function() {
		var html = App.templates['index']();//вызываем template.hbs -темплейт стр. index, в результате возвращает html

		$('.main').html(html);//jquery рисует разметку html c помощью метода html в .main
		init();//вызываем ф-цию init для того, что бы отработал код ниже.
	});

	$.router.add('/myauction/build/contacts', function() {
		var html = App.templates['contacts']();//вызываем template.hbs -темплейт стр. index, в результате возвращает html

		$('.main').html(html);//jquery рисует разметку html c помощью метода html в .main
		init();
	});

	$.router.go('/myauction/build/');//пишем для перехода по ссылке
//здесь будут создаваться именно инстансы для каждого класса(функция конструктор и ее прототип) приложенияб
	function init() {//инициализация всех компонетов
		var components = $('[data-components]');//получаем массив эл-ов у которых есть дата атрибут data-components. $ возвращает объект в свойствах которого есть кол-ция дом элементов с дата атибутом data-components
	
		$.each(components, function(index, node) {
			var modules = node.dataset.components;//смотрим значение дата-атрибута с именем компонетс

			modules.split(' ').forEach(function(module) {
				App.instances[module] = App.instances[module] || [];

				if (App.classes[module]) {
					App.instances[module].push(new App.classes[module](node));
				} else {
					throw new Error('Module ' + module + ' does not exist.');
				}
			});
		})
	}
}, 0);//выполнится, через указанное кол-во милсек после выполнения синхронного кода
var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};//создаем второе св-во объекта. Будет хранить все классы(функции конструткоры и их прототипы), которые создают instances


App.classes.Contacts = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
	var $root = $(element);//создаем jquery объект и кладем его в переменную, на основе element для каждого instance 
	//console.log(element);
	//console.log($root);
	//this ссылка на instance(объект созданный на основе функции конструткор)
	this.data = null; //this.data это св-во instance в которое мы будем класть данные, полученные с сервера
	this.elements = { //в этом св-ве мы будем хранить все элементы, с которыми мы будем работать в рамках рута
		$root: $root //в св-во объекта this.elements мы записывает значение переменной $root, далее мы сможем обращаться к этой переменной через this.elements.$root
	};
	//console.log(this.elements.$root);
	this.init();//есть цепочка прототипов, и если этот метод не существует в объекте, он берется из прототипа, и так ниже.
//instance создается в цикле в самовызывающейся ф-ции(описано внизу стр-цы)
};
//метод init используется для того, чтобы вызывать другие методы 
App.classes.Contacts.prototype.init = function() {//запись в прототип этого метода

}
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
		$link: $root.find('.nav__item-link'),
	};

	this.url = '/myauction/build/';

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
	var id = $current.attr('id');
	var currentUrl = this.url + id;

	this.go(currentUrl);
};

App.classes.Nav.prototype.go = function(currentUrl) {
	$.router.go(currentUrl);
};






var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};//создаем второе св-во объекта. Будет хранить все классы(функции конструткоры и их прототипы), которые создают instances

//в App.classes будут храниться все классы, те классы это функции конструкторы и их прототипы

App.classes.ProductList = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
	var $root = $(element);//создаем jquery объект и кладем его в переменную, на основе element для каждого instance 
	//console.log(element);
	//console.log($root);
	//this ссылка на instance(объект созданный на основе функции конструткор)
	this.data = null; //this.data это св-во instance в которое мы будем класть данные, полученные с сервера
	this.elements = { //в этом св-ве мы будем хранить все элементы, с которыми мы будем работать в рамках рута
		$root: $root //в св-во объекта this.elements мы записывает значение переменной $root, далее мы сможем обращаться к этой переменной через this.elements.$root
	};
	//console.log(this.elements.$root);
	this.init();//есть цепочка прототипов, и если этот метод не существует в объекте, он берется из прототипа, и так ниже.
//instance создается в цикле в самовызывающейся ф-ции(описано внизу стр-цы)
};
//метод init используется для того, чтобы вызывать другие методы 
App.classes.ProductList.prototype.init = function() {//запись в прототип этого метода
 	this.getProducts();
};

App.classes.ProductList.prototype.getProducts = function() {

	var _this = this; //сохраняем контекст в переменную, потому что в аяксе this будет ссылаться не на instance, а на ajax объект

	$.ajax({
		url: '/Myauction/services/products.json',
		dataType: 'json',
		method: 'GET',
		success: function(data) {
			_this.render(data);
		},
		error: function(jqXHR) {
			_this.render(jqXHR, true);

		}
	});
};

App.classes.ProductList.prototype.render = function(data, isError) {
	var template;

	if (isError) {//если isError будет true, то будет выполняться это, если нет, то другая часть услоной конструкции
		template = App.templates.error(data);// здесь используется hbs шаблон error
		this.elements.$root.html(template);//html метод jquery объекта. Он вставляет, как html переданный ему параметр
	} else {
		template = App.templates['product-list'](data);
		this.elements.$root.html(template);
	}
};

App.classes.Template = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
	var $root = $(element);//создаем jquery объект и кладем его в переменную, на основе element для каждого instance 
	//console.log(element);
	//console.log($root);
	//this ссылка на instance(объект созданный на основе функции конструткор)
	this.data = null; //this.data это св-во instance в которое мы будем класть данные, полученные с сервера
	this.elements = { //в этом св-ве мы будем хранить все элементы, с которыми мы будем работать в рамках рута
		$root: $root //в св-во объекта this.elements мы записывает значение переменной $root, далее мы сможем обращаться к этой переменной через this.elements.$root
	};
	//console.log(this.elements.$root);
	this.init();//есть цепочка прототипов, и если этот метод не существует в объекте, он берется из прототипа, и так ниже.
//instance создается в цикле в самовызывающейся ф-ции(описано внизу стр-цы)
};
//метод init используется для того, чтобы вызывать другие методы 
App.classes.Template.prototype.init = function() {//запись в прототип этого метода

}