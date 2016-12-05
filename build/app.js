

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

	$.router.add('/myauction/build/test', function() {
		var html = App.templates['test']();//вызываем template.hbs -темплейт стр. index, в результате возвращает html

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
var App = App || {};

App.instances = App.instances || {};
App.classes = App.classes || {};


App.classes.Nav = function(element) { 
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





var App = App || {};

App.instances = App.instances || {};
App.classes = App.classes || {};

App.classes.mainSlider = function(element) { 
	var $root = $(element);
	this.data = null; 
	this.elements = { 
		$root: $root 
	};
	this.init();
};

App.classes.mainSlider.prototype.init = function() {
	this.slider();
};

App.classes.mainSlider.prototype.slider = function() {
	this.elements.$root.slick({
		autoplay: true,
  		autoplaySpeed: 2500,
  		fade: true,
  		cssEase: 'linear'
	});
};

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













var App = App || {};//создаем глобальную переменную. Пространство имен приложения.

App.instances = App.instances || {};//создаем св-во объекта, будет хранить все инстансы. Инстансы - это объекты созданные при вызове ф-ции кнструктора со словом new

App.classes = App.classes || {};

App.classes.Template = function(element) { //описываем ф-цию конструткор. Элемент каждый раз будет ссылаться на аргумент(переданное занчение при вызове ф-ции), переданный при создании конкретного instance
	var $root = $(element);//создаем jquery объект и кладем его в переменную, на основе element для каждого instance 
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
var App = App || {};

App.instances = App.instances || {};

App.classes = App.classes || {};

App.data = {};
console.log(App.data);


App.classes.Test = function(element) {
	var $root = $(element);
	this.elements = { 
		$root: $root,
		$table: $root.find('.table'),
		$tableRow: $root.find('.table__row'),
		$tableCell: $root.find('.table__cell'),
		$button: $root.find('.table__button'),
		$window: $(window)
	};

	this.updateHeight = _.throttle(this.updateHeight.bind(this), 200);
	this.toggleTableRowColor = this.toggleTableRowColor.bind(this);
	this.toggleTableView = this.toggleTableView.bind(this);

	this.options = {
		allRowsAmount: 5,
		visibleRowsAmount: 3
	};

	this.data = {};

	this.modifiers = {
		visibleTable: 'table_visible',
		coloredTableCell: 'table__cell_colored'
	};

	this.init();
	this.attachEvents();
};

App.classes.Test.prototype.init = function() {
	this.updateHeight();
	this.requestTableText();
};

App.classes.Test.prototype.attachEvents = function() {
	this.elements.$button.on('click', this.toggleTableView);
	this.elements.$window.on('resize', this.updateHeight);
	this.elements.$table.on('click', this.elements.$tableRow, this.toggleTableRowColor);
};

App.classes.Test.prototype.toggleTableView = function(event) {
	this.elements.$table.toggleClass(this.modifiers.visibleTable);

	this.setTableHeight();
};

App.classes.Test.prototype.toggleTableRowColor = function(event) {
	var $current = $(event.target);
	
	$current.toggleClass(this.modifiers.coloredTableCell);

	if ($current.hasClass(this.modifiers.coloredTableCell)) {
		$current.css("background-color", "red");
	} else {
		$current.css("background-color", "inherit");
	}
};

App.classes.Test.prototype.updateHeight = function() {
	var _this = this;
	this.data.visibleTableHeight = 0;
	this.data.tableHeight = 0;

	this.elements.$tableRow.each(function ( index, row ) {
		var rowHeight = $(row).height();

		if (index <= (_this.options.visibleRowsAmount - 1)) {
			_this.data.visibleTableHeight += rowHeight;
			_this.data.tableHeight = _this.data.visibleTableHeight;

		} else {
			_this.data.tableHeight += rowHeight;
		}
	});
	this.elements.$table.height(this.data.visibleTableHeight);
	this.setTableHeight();
};

App.classes.Test.prototype.setTableHeight = function() {
	if (this.elements.$table.hasClass(this.modifiers.visibleTable)) {
		this.elements.$table.animate({
			'height':this.data.tableHeight
		}, 500);
	} else {
		this.elements.$table.animate({
			'height': this.data.visibleTableHeight
		}, 500);
	}
};

App.classes.Test.prototype.requestTableText = function() {
	var _this = this;
	$.ajax({
		url: '/Myauction/services/test.json',
		dataType: 'json',
		method: 'GET',
		success: function(data) {
			App.data.tableText = data;
			console.log(App.data.tableText);
		},
		error: function(jqXHR) {
			
		}
	});
};

// App.classes.Test.prototype.render = function(data, isError) {
// 	var TableCellText;

// 	if (isError) {//если isError будет true, то будет выполняться это, если нет, то другая часть услоной конструкции
// 		TableCellText = App.templates.error(data);// здесь используется hbs шаблон error
// 		this.elements.$root.html(TableCellText);//html метод jquery объекта. Он вставляет, как html переданный ему параметр
// 	} else {
// 		 TableCellText = App.templates['test'](data);
// 		 this.elements.$tableCell.html(TableCellText);
// 	}
// };








