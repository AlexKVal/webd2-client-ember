import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

export default Ember.Route.extend(ApplicationRouteMixin, {
  flashMessages: Ember.inject.service(),

  actions: {
    error(error) {
      this.get('flashMessages').danger(messageFromError(error), {sticky: true});
    }
  }
});
