import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Component.extend({
  session: service(),
  flashMessages: service(),

  actions: {
    authenticate(id, password) {
      this.get('session').authenticate('authenticator:jwt', { id, password })
      .catch((reason) => this.get('flashMessages').danger(reason));

      this.set('password', '');
      this.$('input[type="password"]').focus();
    }
  }
});
