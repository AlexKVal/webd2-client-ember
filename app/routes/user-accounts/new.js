import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // TODO: default values
    return this.store.createRecord('user-account', {
      rights: '6', // some default rights
      userGroup: this.store.peekRecord('user-group', 5)
    });
  }
});
