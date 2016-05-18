import Ember from 'ember';

const { inject: { service }, computed, Component } = Ember;

export default Component.extend({
  session: service(),
  router: service('-routing'),

  isOptionsRoute: computed('router.currentRouteName', function() {
    return this.get('router.currentRouteName').match('options');
  }),

  actions: {
    toRoute(routeName) {
      this.get('router').transitionTo(routeName);
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
