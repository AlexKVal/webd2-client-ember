import Ember from 'ember';
import SuperAdminsOnly from 'webd2-client-ember/routes/authz-super-admins-only';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

export default SuperAdminsOnly.extend({
  flashMessages: Ember.inject.service(),

  _flashError(error) {
    this.get('flashMessages').danger(messageFromError(error), {sticky: true});
  },

  actions: {
    delete(user) {
      user.set('hide', true);
      user.save()
      .then(() => this.get('flashMessages').success(`${user.get('name')} has been deleted`))
      .catch((error) => this._flashError(error));
    },

    undelete(user) {
      user.set('hide', false);
      user.save()
      .then(() => this.get('flashMessages').success(`${user.get('name')} has been restored`))
      .catch((error) => this._flashError(error));
    }
  }
});
