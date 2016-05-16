import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

const { inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  flashMessages: service(),
  session: service(),

  actions: {
    error(error) {
      this.get('flashMessages').danger(messageFromError(error), {sticky: true});
    },

    authenticate(id, password) {
      this.get('session').authenticate('authenticator:jwt', { id, password })
      .catch((response) => {
        const flash = this.get('flashMessages');

        if (!Array.isArray(response.errors)) {
          return flash.danger(response, {sticky: true});
        }

        response.errors.forEach((error) => {
          if (error.title === 'Unauthorized') {
            flash.danger('Wrong password');
          } else {
            flash.danger(error.detail, {sticky: true});
          }
        });
      });
    }
  }
});
