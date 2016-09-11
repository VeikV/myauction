

setTimeout(function() {//создает ассинхронный поток кода, делаем для того, что бы оно работало после того, как проинициализируются все компонеты(предыдущие js файлы)

	$.router.add('/myauction/build/', function() {
		var html = App.templates['index']();//вызываем template.hbs -темплейт стр. index, в результате возвращает html

		$('.main').html(html);//jquery рисует разметку html c помощью метода html в .main
		init();//вызываем ф-цию init для того, что бы отработал код ниже.
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