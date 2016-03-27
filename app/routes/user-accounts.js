import Ember from 'ember';
import SuperAdminsOnly from 'webd2-client-ember/routes/authz-super-admins-only';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

export default SuperAdminsOnly.extend({
  flashMessages: Ember.inject.service(),

  model() {
    return this.store.findAll('user-account');
  },

  actions: {
    delete(user) {
      user.destroyRecord()
      .catch((error) => {
        this.get('flashMessages').danger(messageFromError(error), {sticky: true});
      });
    }
  }
});
