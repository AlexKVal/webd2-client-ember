import Ember from 'ember';
import Flash from 'webd2-client-ember/mixins/flash';

export default Ember.Component.extend(Flash, {
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
      .then(() => this.flashSuccess('Saved'))
      .catch((error) => this.flashStickyErrors(error));
    },

    restore() {
      this.get('restoreAction')(this.get('model'));
    }
  }
});
