import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    authenticate(id, password) {
      this.get('session').authenticate('authenticator:jwt', { id, password })
      .catch((reason) => {
        this.set('errorMessage', reason);
        Ember.run.later(this, function() {
          this.set('errorMessage', null);
        }, 2000);
      });

      this.set('password', '');
    }
  }
});
