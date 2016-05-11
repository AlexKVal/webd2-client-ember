import Ember from 'ember';
import SuperAdminsOnly from 'webd2-client-ember/routes/authz-super-admins-only';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

export default SuperAdminsOnly.extend({
  flashMessages: Ember.inject.service(),

  model() {
    return this.store.query('user-group', {related: true});
  },

  _flashError(error) {
    this.get('flashMessages').danger(messageFromError(error), {sticky: true});
  },

  actions: {
    delete(unit) {
      unit.set('hide', true);
      unit.save()
      .then(() => this.get('flashMessages').success(`${unit.get('name')} has been deleted`))
      .catch((error) => {
        this._flashError(error);
        unit.rollbackAttributes();
      });
    },

    undelete(unit) {
      unit.set('hide', false);
      unit.save()
      .then(() => this.get('flashMessages').success(`${unit.get('name')} has been restored`))
      .then(() => this.transitionTo('user-groups.index', {queryParams: {deleted: false}}))
      .catch((error) => {
        this._flashError(error);
        unit.rollbackAttributes();
      });
    }
  }
});
