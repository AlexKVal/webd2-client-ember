import Ember from 'ember';
import SuperAdminsOnly from 'webd2-client-ember/routes/authz-super-admins-only';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

export default SuperAdminsOnly.extend({
  flashMessages: Ember.inject.service(),

  model() {
    return this.store.findAll('user-group');
  },

  _flashError(error) {
    this.get('flashMessages').danger(messageFromError(error), {sticky: true});
  },

  actions: {
    delete(userGroup) {
      userGroup.set('hide', true);
      userGroup.save()
      .then(() => this.get('flashMessages').success(`${userGroup.get('name')} has been deleted`))
      .catch((error) => {
        this._flashError(error);
        userGroup.rollbackAttributes();
      });
    },

    undelete(userGroup) {
      userGroup.set('hide', false);
      userGroup.save()
      .then(() => this.get('flashMessages').success(`${userGroup.get('name')} has been restored`))
      .then(() => this.transitionTo('user-groups.index', {queryParams: {deleted: false}}))
      .catch((error) => {
        this._flashError(error);
        userGroup.rollbackAttributes();
      });
    }
  }
});
