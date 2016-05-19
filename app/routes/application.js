import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Flash from 'webd2-client-ember/mixins/flash';

const { inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, Flash, {
  session: service(),

  actions: {
    error(errors) {
      this.flashStickyErrors(errors);
    },

    authenticate(id, password) {
      this.get('session').authenticate('authenticator:jwt', { id, password })
      .catch((response) => {

        if (!Ember.isArray(response.errors)) {
          return this.flashStickyErrors(response);
        }

        response.errors.forEach((error) => {
          if (error.title === 'Unauthorized') {
            this.flashDanger('Wrong password');
          } else {
            this.flashStickyErrors(error.detail);
          }
        });
      });
    },

    delete (model) {
      model.set('hide', true);
      model.save()
      .then(() => this.flashSuccess(`${model.get('name')} has been deleted`))
      .catch((errors) => {
        this.flashStickyErrors(errors);
        model.rollbackAttributes();
      });
    }
  }
});
