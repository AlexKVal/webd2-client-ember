import Ember from 'ember';
import SuperAdminsOnly from 'webd2-client-ember/routes/authz-super-admins-only';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

export default SuperAdminsOnly.extend({
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
      user.save()
      .then(() => this.get('flashMessages').success(`${user.get('name')} has been deleted`))
      .catch((error) => {
        this._flashError(error);
        user.rollbackAttributes();
      });
    },

    undelete(user) {
      user.set('hide', false);
      user.save()
      .then(() => this.get('flashMessages').success(`${user.get('name')} has been restored`))
      .then(() => this.transitionTo('user-accounts.index', {queryParams: {deleted: false}}))
      .catch((error) => {
        this._flashError(error);
        user.rollbackAttributes();
      });
    }
  }
});
