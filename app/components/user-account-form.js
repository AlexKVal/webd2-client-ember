import Ember from 'ember';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

const { service } = Ember.inject;

export default Ember.Component.extend({
  flashMessages: service(),

  rights: [1, 2, 3, 4, 5, 6], // TODO use real rights

  _savePreviousModelRelations() {
    this.set('previousUserGroup', this.get('model.userGroup'));
  },
  _rollbackModelRelations() {
    this.set('model.userGroup', this.get('previousUserGroup'));
  },

  init() {
    this._super(...arguments);
    this._savePreviousModelRelations();
  },

  hasUnsavedChanges: Ember.computed('model.hasDirtyAttributes', 'model.userGroup', function() {
    if (this.get('previousUserGroup.id') !== this.get('model.userGroup.id')) {
      return true;
    }
    return this.get('model.hasDirtyAttributes');
  }),

  actions: {
    cancel() {
      this.model.rollbackAttributes();
      this._rollbackModelRelations();
      history.back();
    },

    save() {
      this.model.save()
      .then(() => this._savePreviousModelRelations())
      .then(() => this.get('flashMessages').success('Saved'))
      .catch((error) => this.get('flashMessages').danger(messageFromError(error), {sticky: true}));
    },

    undelete(userAccount) {
      this.get('onUndelete')(userAccount);
    }
  }
});
