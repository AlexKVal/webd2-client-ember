import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  queryParams: ['deleted'],
  deleted: false,

  filteredGroups: computed('model.@each.hide', 'deleted', function() {
    return this.get('model')
    .filter((group) => group.get('users.length') > 0)
    .filterBy('hide', this.get('deleted'));
  }),

  sortedGroups: computed.sort('filteredGroups', 'sortDefinition'),
  sortDefinition: ['name']
});
