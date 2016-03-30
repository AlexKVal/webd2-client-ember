import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('user-account');
  },

  afterModel(model) {
    model.setProperties({
      rights: '6', // some default rights
      // group: some default group
    });
  }
});
