import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // TODO: default values
    return this.store.createRecord('user-account', {
      rights: '6' // some default rights
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('userGroups', this.store.query('user-group', {filter: {hide: false}}));
  }
});
