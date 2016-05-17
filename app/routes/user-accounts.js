import Ember from 'ember';
import SuperAdminsOnly from 'webd2-client-ember/routes/authz-super-admins-only';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

export default SuperAdminsOnly.extend({
  flashMessages: Ember.inject.service(),

  model() {
    // sideload joined relations to show them on the index/List screen
    return this.store.query('user-account', { includeJoined: true });
  },

  _flashError(error) {
    this.get('flashMessages').danger(messageFromError(error), {sticky: true});
  },

  actions: {
    delete(item) {
      item.set('hide', true);
      item.save()
      .then(() => this.get('flashMessages').success(`${item.get('name')} has been deleted`))
      .catch((error) => {
        this._flashError(error);
        item.rollbackAttributes();
      });
    },

    restore(item) {
      item.set('hide', false);
      item.save()
      .then(() => this.get('flashMessages').success(`${item.get('name')} has been restored`))
      .then(() => this.transitionTo('user-accounts.index', {queryParams: {deleted: false}}))
      .catch((error) => {
        this._flashError(error);
        item.rollbackAttributes();
      });
    }
  }
});
