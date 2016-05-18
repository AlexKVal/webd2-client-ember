import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Flash from 'webd2-client-ember/mixins/flash';

export default Ember.Route.extend(AuthenticatedRouteMixin, Flash, {
  beforeModel(transition) {
    this._super(...arguments);

    const role = this.get('session.data.authenticated.role');
    if (role && role !== 'super') {
      this.flashDanger(`(${this.get('routeName')}) Super admins only`);

      transition.abort();
      this.transitionTo('index');
    }
  }
});
