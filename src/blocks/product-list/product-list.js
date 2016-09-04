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
		url: '/myauction/services/products.json',
		dataType: 'json',
		method: 'GET',
		success: function(data) {
			_this.render(data);
		},
		error: function(jqXHR) {
			_this.render(jqXHR);

		}
	});
};

App.classes.ProductList.prototype.render = function(data) {


};


;(function() {
	var elements = $('.product-list'); //jquery объект, который содержит коллекцию из .product-list. elements массив из элементов с переданным селектором, который возвращается методом $
	//console.log($('.product-list'));
	//console.log(document.getElementsByClassName('product-list'));
	App.instances['product-lists'] = []; //создаем св-во(удобное название), присваиваем ему пустой массив

	for(var i = 0; i < elements.length; i++) {//elements.length - длинна массива, перебирам массив элементс с помощью цикла, кот. запускаем столько раз, сколь эл-ов лежит в массиве
		
		App.instances['product-lists'].push(new App.classes.ProductList(elements[i])); //в созданный массив пушим intance (на каждой иттерации новый). Инстанс мы создается функцией конструткором, вызванной с каждым элеметом массива
	}
})();
