import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * This hook runs only via the URL transition.
   * It is provided for DX (hot-reloading)
   */
  model(params) {
    return this.store.peekRecord('user-group', params.group_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    const currentGroup = model;
    const allUsers = this.modelFor('login').users;

    controller.set('groupUsers', allUsers.filterBy('groupId', currentGroup.id));
  }
});
