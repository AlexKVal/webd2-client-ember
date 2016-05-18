import Ember from 'ember';
import messageFromError from 'webd2-client-ember/utils/message-from-error';

export default Ember.Mixin.create({
  flashMessages: Ember.inject.service(),

  flashStickyErrors(errors) {
    this.get('flashMessages').danger(messageFromError(errors), {sticky: true});
  },

  flashSuccess(msg) {
    this.get('flashMessages').success(msg);
  },

  flashDanger(msg) {
    this.get('flashMessages').danger(msg);
  }
});
