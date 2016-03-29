import Ember from 'ember';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),

  model() {
    return this.store.findAll('user-account');
  },

  _flashError(error) {
    this.get('flashMessages').danger(messageFromError(error), {sticky: true});
  },

  actions: {
    delete(user) {
      user.set('hide', true);
      user.save().catch((error) => this._flashError(error));
    },

    undelete(user) {
      user.set('hide', false);
      user.save().catch((error) => this._flashError(error));
    }
  }
});
