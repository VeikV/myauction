

setTimeout(function() {
	$.router.add('/myauction/build/', function() {
		var html = App.templates['index']();

		$('.main').html(html);
		init();
	});

	$.router.add('/myauction/build/contacts', function() {
		var html = App.templates['contacts']();

		$('.main').html(html);
		init();
	});

	$.router.add('/myauction/build/test', function() {
		var html = App.templates['test']();
		$('.main').html(html);
		init();
	});

	var category;

	$('.nav__item-link_category').each(function(index, item) {
		category = $(item).attr('data-id');

	$.router.add('/myauction/build/' + category, function() {
		var html = App.templates['plp']();

		$('.main').html(html);
		init();
	});
	});

	$.router.go('/myauction/build/');

	function init() {
		var components = $('[data-components]');
	
		$.each(components, function(index, node) {
			var modules = node.dataset.components;

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
}, 0);


var Nav = {
	init: function() {}
};
