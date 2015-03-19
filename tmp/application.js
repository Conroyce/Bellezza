(function() {

window.Bellezza = Ember.Application.create();

// These requires will be appended to this file using grunt-neuter


})();

(function() {

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


})();

(function() {

Bellezza.TodoModalMixin = Ember.Mixin.create({
	closeModal: function (modal) {
		var controller = this;
		
		modal.$().on('hidden.bs.modal', function () {
			controller.transitionToRoute('todos.index');
		});
		modal.$().modal('hide');
		
	}
});


})();

(function() {

Bellezza.TodoItemComponent = Ember.Component.extend({

	tagName: 'li',
	classNames: ['list-group-item'],

	classNameBindings: ['todo.done']
});


})();

(function() {

Bellezza.Todo = DS.Model.extend({
	title: DS.attr('string'),
	done: DS.attr('boolean'),

	// Update the database immediately upon checking done
	doneDidChange: function () {
		if (this.get('isDirty')) this.save();
	}.observes('done')
});


})();

(function() {

Bellezza.IndexRoute = Ember.Route.extend({
	model: function (params) {
		return this.store.find('todo');
	}
});


})();

(function() {

Bellezza.TodosNewRoute = Ember.Route.extend({
	model: function () {
		return this.store.createRecord('todo');
	},
	actions: {
		error: function () {
			console.log('error', arguments);
		}
	}
});


})();

(function() {

Bellezza.TodosRoute = Ember.Route.extend({
	model: function () {
		return this.store.find('todo');
	}
});


})();

(function() {

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


})();

(function() {

Bellezza.TodosNewController = Ember.ObjectController.extend(Bellezza.TodoModalMixin, {
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

			person.deleteRecord();

			this.closeModal(modal);
		}
	}
});



})();

(function() {

Bellezza.TodosController = Ember.ArrayController.extend({
	actions: {
		removeDone: function () {
			var doneTodos = this.filterBy('done');
			doneTodos.invoke('deleteRecord');
			doneTodos.invoke('save');
		}
	}
});


})();

(function() {

Bellezza.ApplicationView = Ember.View.extend({

});


})();

(function() {

Bellezza.TodosEditView = Ember.View.extend({

	classNames: ['modal', 'fade'],

	didInsertElement: function () {
		this.$().modal({
			show: true
		});
	}

});


})();

(function() {

Bellezza.TodosNewView = Bellezza.TodosEditView.extend({
	templateName: 'todos/edit',
});


})();

(function() {

Bellezza.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: 'api',
	ajaxError: function(jqXHR) {
		var error = this._super(jqXHR);

		if (jqXHR && jqXHR.status === 422) {
			var errors = Ember.$.parseJSON(jqXHR.responseText)["errors"];

			return new DS.InvalidError(errors);
		} else {
			return error;
		}
	}
});

Bellezza.ApplicationSerializer = DS.RESTSerializer.extend({
	extractSingle: function(store, type, payload, id, requestType) {
		var finalPayload = {};
		finalPayload[type.typeKey] = payload;
		return this._super(store, type, finalPayload, id, requestType);
	},

	extractArray: function(store, type, payload, id, requestType) {
		var finalPayload = {};
		finalPayload[Ember.String.pluralize(type.typeKey)] = payload;
		return this._super(store, type, finalPayload, id, requestType);
	},

	serializeIntoHash: function(data, type, record, options) {
		var serializedData = this.serialize(record, options);
		for (var key in serializedData) {
			if (Ember.isArray(serializedData[key]) && !serializedData[key].length) {

			} else {
				data[key] = serializedData[key];
			}
		}
	},

	keyForRelationship: function(key, kind) {

		key = Ember.String.decamelize(key);
		if (kind === "belongsTo") {
			return key + "_id";
		} else {
			return key;
		}
	},

	normalizeRelationships: function(type, hash) {
		var payloadKey, key, objList, idList = [];

		if (this.keyForRelationship) {
			type.eachRelationship(function(key, relationship) {
				payloadKey = this.keyForRelationship(key, relationship.kind);

				objList = hash[payloadKey] || [];

				objList.forEach(function(item) {
					idList.push(Ember.get(item, 'id'));
				});

				hash[key] = idList;
				delete hash[payloadKey];
			}, this);
		}
	}
});


})();

(function() {

Bellezza.Router.map(function () {
	this.resource('todos', function () {
		this.route('new');
		this.route('edit', {
			path: '/:todo_id'
		});
	});
	this.route('about');
	this.route('contact');
	this.route('error404', { path: '*:' });
});


})();