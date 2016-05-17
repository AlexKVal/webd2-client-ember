import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col-xs-1', 'u-no-lr-padding'],

  actions: {
    delete () {
      this.sendAction('deleteAction', this.get('model'));
    },
    restore () {
      this.sendAction('restoreAction', this.get('model'));
    }
  }
});
