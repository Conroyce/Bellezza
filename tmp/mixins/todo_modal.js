Bellezza.TodoModalMixin = Ember.Mixin.create({
	closeModal: function (modal) {
		var controller = this;
		
		modal.$().on('hidden.bs.modal', function () {
			controller.transitionToRoute('todos.index');
		});
		modal.$().modal('hide');
		
	}
});
