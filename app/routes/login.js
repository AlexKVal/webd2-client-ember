import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model() {
    return this.store.query('user-group', {
      includeJoined: true,
      filter: {hide: false}
    })
    .then((groups) => {
      return groups.filterBy('hasUsers').sortBy('name');
    });
  }
});
