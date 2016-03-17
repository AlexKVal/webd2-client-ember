import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  actions: {
    login() {
      this.sendAction('onLogin');
    },

    logout() {
      const session = this.get('session');
      if (session.get('isAuthenticated')) {
        session.invalidate();
      }
    }
  }
});
