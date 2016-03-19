import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  session: inject.service(),

  authenticated: computed.oneWay('session.data.authenticated'),

  isLoginRoute: computed('routeName', function() {
    return this.get('routeName').match('login');
  }),

  actions: {
    login() {
      this.sendAction('toLoginRoute');
    },

    logout() {
      const session = this.get('session');
      if (session.get('isAuthenticated')) {
        session.invalidate();
      }
    },

    userNamePress() {
      this.sendAction('toLoginRoute');
    },

    back() {
      history.back();
    }
  }
});
