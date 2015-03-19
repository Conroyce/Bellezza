Ember.Application.initializer({
	name: 'setup',

	initialize: function (container, application) {
		// Basic idea of an initializer
		// Do things like setup injections here
		
		// Force the menu to collapse on navigation
		$('body').on('click', '.navbar-collapse li', function () {
			$('.navbar-collapse').collapse('hide');
		});
		
	}
});
