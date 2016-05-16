import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    login() {
      this.sendAction('loginAction', this.get('user.id'), this.get('password'));
      this.set('password', '');
    }
  }
});
