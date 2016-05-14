import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('user-account', params.id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('userGroups', this.store.query('user-group', {filter: {hide: false}}));
  }
});
