import Ember from 'ember';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

export default Ember.Component.extend({
  flashMessages: Ember.inject.service(),

  actions: {
    cancel() {
      this.model.rollbackAttributes();
      history.back();
    },

    save() {
      this.model.save()
      .catch((error) => {
        this.get('flashMessages').danger(messageFromError(error), {sticky: true});
      });
    }
  }
});
