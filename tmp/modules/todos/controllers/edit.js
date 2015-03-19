Bellezza.TodosEditController = Ember.ObjectController.extend(Bellezza.TodoModalMixin, {
	actions: {
		save: function (modal) {
			var controller = this,
				person = this.get('model');

			person.save().then(function () {
				controller.closeModal(modal);
			});
		},

		cancel: function (modal) {
			var person = this.get('model');

			person.rollback();

			this.closeModal(modal);
		}
	}
});
