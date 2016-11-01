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




