import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['deleted'],
  deleted: false,

  filteredUnits: Ember.computed('model.@each.hide', 'deleted', function() {
    return this.get('model').filterBy('hide', this.get('deleted'));
  })
});
