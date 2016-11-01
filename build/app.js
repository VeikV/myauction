

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
					var hasInstance = !!$.data(node, module);

					if (!hasInstance) {
						var instance = new App.classes[module](node);

						$.data(node, module, instance);

						App.instances[module].push(instance);
					}
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






var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};//создаем второе св-во объекта. Будет хранить все классы(функции конструткоры и их прототипы), которые создают instances
App.data = {};

App.classes.ProductList = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
	var $root = $(element);//создаем jquery объект и кладем его в переменную, на основе element для каждого instance 
	this.elements = { //в этом св-ве мы будем хранить все элементы, с которыми мы будем работать в рамках рута
		$root: $root,//в св-во объекта this.elements мы записывает значение переменной $root, далее мы сможем обращаться к этой переменной через this.elements.$root
		$navItem: $('[data-id]'),
		$window: $(window)
	};

	this.handleError = this.handleError.bind(this);
	this.increasePage = this.increasePage.bind(this);
	this.checkPositions = _.throttle(this.checkPositions.bind(this), 200);
	this.render = this.render.bind(this);
	this.products = {
		items: []
	};
	this.page = 1;
	this.category = App.instances.Nav[0].category;
	this.init();
	this.attachEvents();
};

$.extend(App.classes.ProductList.prototype, {
	handleError: function(error) {
	var template = App.templates['error'](error);

	this.elements.$root.append(template)
	this.elements.$window.off('.products')
	},

	init: function() {//запись в прототип этого метода

		this.requestProducts(this.page, this.products)
			.then(this.increasePage)
			.then(this.render)
			.catch(this.handleError);
	},

	increasePage: function(products) {
		var _this = this;

		return new Promise(function(resolve, reject) {
			_this.page++;
			resolve(products);
		});
	},

	requestProducts: function(page, products) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: '/Myauction/services/products-' + page + '.json',
				data: {
					sort: 'ASC',
					category: 'category',
					limit: 4
					
				},
				dataType: 'json',
				method: 'GET',
				success: function(data) {
					for (var i = 0; i < data.items.length; i++) {
						products.items.push(data.items[i]);
					}

					resolve(products);
				},
				error: function(data) {
					reject(data);
				}
			});
		});
	},

	getCategory: function(event) {
		var target = event.target;
		this.category = $(target).data('id');
	},

    getCategoryProducts: function(data) {
		var _this = this;

		this.data.items = data.items.filter(function(product) {
			return product.category.toLowerCase() == _this.category.toLowerCase();
		});

		if (this.data.items.length) {
			this.render(this.data, false, false, true);
		} else {
			this.render(this.data, false, true);
		}
	},

	render: function(data) {
		var template = App.templates['product-list'](data);

		this.elements.$root.html(template);
	},

	checkPositions: function() {
		var scrollPosition = this.elements.$window.scrollTop() + this.elements.$window.height();

		if (scrollPosition >= this.elements.$root.offset().top + this.elements.$root.height()) {
			this.requestProducts(this.page, this.products)
				.then(this.increasePage)
				.then(this.render)
				.catch(this.handleError);
		}
	},

	getPageData: function() {
		this.pageData.height = this.elements.$root.height();
		this.pageData.bottom = this.pageData.height + this.elements.$root.offset().top;
	},

	getCurrentProducts: function() {
		var _this = this;
		var data = {};

		this.pageData.number++;
		
		var startIndex = this.options.productsInitialCount + this.options.productsLoadCount * (this.pageData.number - 1);
		var endIndex = startIndex + this.options.productsLoadCount;

		data.items = this.data.items.filter(function(item, index) {
			return (index >= startIndex && index < endIndex);
		});

		return data;
	},

	attachEvents: function() {
		this.elements.$window.on('scroll.products', this.checkPositions);
	}
});





var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};

App.classes.mainSlider = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
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
App.classes.mainSlider.prototype.init = function() {//запись в прототип этого метода
	this.slider();
}

App.classes.mainSlider.prototype.slider = function() {
	this.elements.$root.slick();
};

var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};//создаем второе св-во объекта. Будет хранить все классы(функции конструткоры и их прототипы), которые создают instances
App.data = {};

//в App.classes будут храниться все классы, те классы это функции конструкторы и их прототипы

App.classes.SpecialList = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
	var $root = $(element);//создаем jquery объект и кладем его в переменную, на основе element для каждого instance 	//this ссылка на instance(объект созданный на основе функции конструткор)
	this.data = null; //this.data это св-во instance в которое мы будем класть данные, полученные с сервера
	this.elements = { //в этом св-ве мы будем хранить все элементы, с которыми мы будем работать в рамках рута
		$root: $root,
		$window: $(window)
		 //в св-во объекта this.elements мы записывает значение переменной $root, далее мы сможем обращаться к этой переменной через this.elements.$root
	};
	//console.log(this.elements.$root);
	this.init();//есть цепочка прототипов, и если этот метод не существует в объекте, он берется из прототипа, и так ниже.
//instance создается в цикле в самовызывающейся ф-ции(описано внизу стр-цы)
};
//метод init используется для того, чтобы вызывать другие методы 
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
		this.attachEvents();
		this.elements.$root.find('.slick-arrow').fadeOut();
	}
};

App.classes.SpecialList.prototype.carusel = function() {
	this.elements.$root.slick({
	 lazyLoad: 'ondemand',
	 slidesToShow: 4,
	 slidesToScroll: 1
	});
};

App.classes.SpecialList.prototype.attachEvents = function() {
	this.elements.$root.on('mouseenter mouseleave', this.fadeOut.bind(this));
};

App.classes.SpecialList.prototype.fadeOut = function() {
	this.elements.$root.find('.slick-arrow').fadeToggle();
};













var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};

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