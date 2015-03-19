module("Index", {
  setup: function () {
    Bellezza.reset();
  }
});

test("First H1 contains Bellezza", function () {
  visit('/').then(function () {
    equal($('#ember h1').html(), 'Bellezza', 'Title is Bellezza');
  });
});

