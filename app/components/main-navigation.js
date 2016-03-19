import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  session: inject.service(),

  isLoginRoute: computed('routeName', function() {
    return this.get('routeName').match('login');
  }),

  actions: {
    logout() {
      const session = this.get('session');
      if (session.get('isAuthenticated')) {
        session.invalidate();
      }
    },

    back() {
      history.back();
    }
  }
});
