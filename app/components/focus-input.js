import Ember from 'ember';

export default Ember.TextField.extend({
  didInsertElement() {
    this.$().focus().select();
  }
});
