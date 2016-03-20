import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Component.extend({
  session: service(),
  flashMessages: service(),

  actions: {
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

      this.set('password', '');
      this.$('input[type="password"]').focus();
    }
  }
});
