import Ember from 'ember';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),

  queryParams: {
    deleted: { refreshModel: true }
  },
  model(params) {
    return this.store.query('user-account', params);
  },

  actions: {
    delete(user) {
      user.destroyRecord()
      .catch((error) => this.get('flashMessages').danger(messageFromError(error), {sticky: true}));
    }
  }
});
