Meteor.startup(function() {
  if (Items.find().count() === 0) {
    _(100).times(function() {
      Items.insert({
        sentance: Fake.sentence(7)
      });
    });
  }
});
