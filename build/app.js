

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

	var category;

	$('.nav__item-link_category').each(function(index, item) {
		category = $(item).attr('data-id');

	$.router.add('/myauction/build/' + category, function() {
		var html = App.templates['plp']();//вызываем template.hbs -темплейт стр. index, в результате возвращает html

		$('.main').html(html);//jquery рисует разметку html c помощью метода html в .main
		init();
	});
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
		$link: $root.find('.nav__item-link')
	};

	this.url = '/myauction/build/';

	this.attachEvents();
	//console.log(this.elements.$root);
	this.init();//есть цепочка прототипов, и если этот метод не существует в объекте, он берется из прототипа, и так ниже.
//instance создается в цикле в самовызывающейся ф-ции(описано внизу стр-цы)
};
//метод init используется для того, чтобы вызывать другие методы 
App.classes.Nav.prototype.init = function() {//запись в прототип этого метода
	// this.setDataAttributes();
};

// App.classes.Nav.prototype.setDataAttributes = function() {
// 	var dataCategory;

// 	this.elements.$category.each(function(index, item) {
// 		dataCategory = $(item).text().toLowerCase().split(' ').join('');
// 		$(item).attr('data-category', dataCategory);
// 	});
// };

App.classes.Nav.prototype.attachEvents = function() {
	this.elements.$root.on('click', this.elements.$link, this.getUrl.bind(this));//В руте при клике на этот эл-нт вызывается этот метод
};

App.classes.Nav.prototype.getUrl = function(event) {
	event.preventDefault();

	var $current = $(event.target);
	var id = $current.data('id');
	var currentUrl = this.url + id;

	this.go(currentUrl);
};

App.classes.Nav.prototype.go = function(currentUrl) {
	$.router.go(currentUrl);
};






var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};//создаем второе св-во объекта. Будет хранить все классы(функции конструткоры и их прототипы), которые создают instances


App.classes.ProductList = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
	var $root = $(element);//создаем jquery объект и кладем его в переменную, на основе element для каждого instance 
	//console.log(element);
	//console.log($root);
	//this ссылка на instance(объект созданный на основе функции конструткор)
	this.data = null; //this.data это св-во instance в которое мы будем класть данные, полученные с сервера
	this.elements = { //в этом св-ве мы будем хранить все элементы, с которыми мы будем работать в рамках рута
		$root: $root,//в св-во объекта this.elements мы записывает значение переменной $root, далее мы сможем обращаться к этой переменной через this.elements.$root
		$navItem: $('[data-category]'),
		$window: $(window)
	};

	this.category = null;
	this.init();//есть цепочка прототипов, и если этот метод не существует в объекте, он берется из прототипа, и так ниже.
//instance создается в цикле в самовызывающейся ф-ции(описано внизу стр-цы)
	this.attachEvents();
};
//метод init используется для того, чтобы вызывать другие методы 
App.classes.ProductList.prototype.init = function() {//запись в прототип этого метода
	this.getProducts();
};

App.classes.ProductList.prototype.attachEvents = function() {

	this.elements.$window.on('click', this.elements.navItem, this.getCategory.bind(this));
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
			_this.getCurrentProducts(data);
		},
		error: function(jqXHR) {
			_this.render(jqXHR, true);
		}
	});
};

App.classes.ProductList.prototype.getCurrentProducts = function(data) {
	this.data = data;
	var _this = this;

	var data = {};

	data.items = this.data.items.filter(function(product) {
		console.log(product.category, _this.category);
		return product.category.toLowerCase() == _this.category.toLowerCase();
	});

	if(data.items.length) {
		this.render(data);
	} else {
		this.render(data, false, true);
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



var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};//создаем второе св-во объекта. Будет хранить все классы(функции конструткоры и их прототипы), которые создают instances

//в App.classes будут храниться все классы, те классы это функции конструкторы и их прототипы

App.classes.SpecialList = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
	var $root = $(element);//создаем jquery объект и кладем его в переменную, на основе element для каждого instance 	//this ссылка на instance(объект созданный на основе функции конструткор)
	this.data = null; //this.data это св-во instance в которое мы будем класть данные, полученные с сервера
	this.elements = { //в этом св-ве мы будем хранить все элементы, с которыми мы будем работать в рамках рута
		$root: $root,
		$window: $(window) //в св-во объекта this.elements мы записывает значение переменной $root, далее мы сможем обращаться к этой переменной через this.elements.$root
	};
	//console.log(this.elements.$root);
	this.init();//есть цепочка прототипов, и если этот метод не существует в объекте, он берется из прототипа, и так ниже.
//instance создается в цикле в самовызывающейся ф-ции(описано внизу стр-цы)
};
//метод init используется для того, чтобы вызывать другие методы 
App.classes.SpecialList.prototype.init = function() {//запись в прототип этого метода
 	this.getProducts();
};

App.classes.SpecialList.prototype.getProducts = function() {

	var _this = this; //сохраняем контекст в переменную, потому что в аяксе this будет ссылаться не на instance, а на ajax объект

	$.ajax({
		url: '/Myauction/services/products.json',
		dataType: 'json',
		method: 'GET',
		success: function(data) {
			_this.render(data);
			// _this.elements.$window.trigger('getProducts', data);

		},
		error: function(jqXHR) {
			_this.render(jqXHR, true);
			// _this.elements.$window.trigger('getProducts', {isError: true, status: jqXHR.status, statusText: jqXHR.statusText});
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
	}
};

App.classes.SpecialList.prototype.carusel = function() {
	this.elements.$root.slick({
	  dots: true,
	  infinite: false,
	  speed: 300,
	  slidesToShow: 4,
	  slidesToScroll: 4,
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 3,
	        infinite: true,
	        dots: true
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }
	    // You can unslick at a given breakpoint now by adding:
	    // settings: "unslick"
	    // instead of a settings object
	  ]
	});
}



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