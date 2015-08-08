Meteor.startup(function() {
  if (Items.find().count() === 0) {
    _(100).times(function() {
      Items.insert({
        sentence: Fake.sentence(7)
      });
    });
  }
});
