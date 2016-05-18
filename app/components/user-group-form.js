import Ember from 'ember';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

const { service } = Ember.inject;

export default Ember.Component.extend({
  hasUnsavedChanges: Ember.computed('model.hasDirtyAttributes', function() {
    // here go validations
    return this.get('model.hasDirtyAttributes');
  }),

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

    restore() {
      this.get('restoreAction')(this.get('model'));
    }
  }
});
