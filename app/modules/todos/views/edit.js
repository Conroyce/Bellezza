Bellezza.TodosEditView = Ember.View.extend({

	classNames: ['modal', 'fade'],

	didInsertElement: function () {
		this.$().modal({
			show: true
		});
	}

});
