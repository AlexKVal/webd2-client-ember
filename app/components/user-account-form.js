import Ember from 'ember';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

const { service } = Ember.inject;

export default Ember.Component.extend({
  flashMessages: service(),

  rights: [1, 2, 3, 4, 5, 6], // TODO use real rights

  actions: {
    cancel() {
      this.model.rollbackAttributes();
      history.back();
    },

    save() {
      this.model.save()
      .then(() => this.get('flashMessages').success('Saved'))
      .catch((error) => this.get('flashMessages').danger(messageFromError(error), {sticky: true}));
    },

    undelete(userAccount) {
      this.get('onUndelete')(userAccount);
    }
  }
});
