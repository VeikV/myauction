var App = App || {};

App.instances = App.instances || {};

App.classes = App.classes || {};
App.data = {};

App.classes.ProductList = function(element) { 
	var $root = $(element);
	this.elements = { 
		$root: $root,
		$navItem: $('[data-id]'),
		$window: $(window)
	};

	this.handleError = this.handleError.bind(this);
	this.increasePage = this.increasePage.bind(this);
	this.getCategoryProducts = this.getCategoryProducts.bind(this);
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

		this.elements.$root.append(template);
		this.elements.$window.off('.products');
	},

	init: function() {

		this.requestProducts(this.page, this.products)
			.then(this.getCategoryProducts)
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

    getCategoryProducts: function(data) {
		var _this = this;

		return new Promise(function(resolve, reject) {
			_this.products.items = data.items.filter(function(product) {
				return product.category.toLowerCase() == App.instances.Nav[0].category.toLowerCase();
			});

			resolve(_this.products);
		});
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
				.then(this.getCategoryProducts)
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




