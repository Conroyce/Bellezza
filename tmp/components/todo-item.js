Bellezza.TodoItemComponent = Ember.Component.extend({

	tagName: 'li',
	classNames: ['list-group-item'],

	classNameBindings: ['todo.done']
});
