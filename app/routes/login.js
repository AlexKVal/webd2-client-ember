import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('user-group');
  },

  actions: {
    passwordSubmit(user, password) {
      console.log(user.get('name'));
      console.log(password);
      console.log('passwordSubmit clicked');
    }
  }
});
