import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  flashMessages: Ember.inject.service(),

  beforeModel(transition) {
    this._super(...arguments);

    const role = this.get('session.data.authenticated.role');
    if (role && role !== 'admin' && role !== 'super') {
      this.get('flashMessages')
      .danger(`(${this.get('routeName')}) Admins and higher only`);

      transition.abort();
      this.transitionTo('index');
    }
  }
});
