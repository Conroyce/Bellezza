Bellezza.Router.map(function () {
	// this.resource('todos', function () {
	// 	this.route('new');
	// 	this.route('edit', {
	// 		path: '/:todo_id'
	// 	});
	// });
	// this.route('about');
	// this.route('contact');
  this.route('services');
  this.route('schedule');
	this.route('error404', { path: '*:' });
});

var data = {
  "Hair": [{
    "Professional Cuts": {
      "Woman": "$40-60",
      "Men": "$30-50+",
      "Teens": "$35+",
      "Kids": "$25+"
    },
    "Special Services": {
      "Blow Out": "$35+",
      "Condition TX": "$25+",
      "30 Minute Scalp Massage": "$30+",
      "Updo/Ironwork": "$55+",
      "Extensions": "*"
    },
    "Chemical Services": {
      "Color Touch Up": "$70+",
      "All Over Color": "$70+",
      "Mini Highlight": "$45+",
      "Partial Highlight": "$85+",
      "Full Highlight": "$105+",
      "Color Correction":  "*",
      "Straighten": "*",
      "Smoothing": "*",
      "Perm": "$105+",
      "Partial Perm": "$85+"
    }
  }]
};

var keys = ["hey","bye","hi"];
var obj = ["nice","cool","great"];

Bellezza.ServicesRoute = Ember.Route.extend({
  model: function() {
    return keys, obj;
  }
});