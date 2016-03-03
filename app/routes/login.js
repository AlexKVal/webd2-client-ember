import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      groups: this.store.findAll('user-group'),
      users: this.store.findAll('user')
    });
  }
});
