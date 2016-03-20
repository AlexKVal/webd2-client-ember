import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  flashMessages: Ember.inject.service(),

  actions: {
    error(error) {
      const flash = this.get('flashMessages');

      flash.danger(error.message, {sticky: true});

      if (Array.isArray(error.errors)) {
        error.errors.forEach((error) => {
          const message = error.title ? `[${error.title}] ` : '';
          flash.danger(message + error.detail, {sticky: true});
        });
      }
    }
  }
});
