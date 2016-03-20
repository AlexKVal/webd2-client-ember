import Ember from 'ember';

const { inject: { service }, computed, Component } = Ember;

export default Component.extend({
  session: service(),
  router: service('-routing'),

  isLoginRoute: computed('router.currentRouteName', function() {
    return this.get('router.currentRouteName').match('login');
  }),

  actions: {
    toLoginRoute() {
      this.get('router').transitionTo('login');
    },

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
