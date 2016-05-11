import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['deleted', 'adminsOnly', 'group'],
  deleted: false,
  adminsOnly: false,
  group: null,


  filteredUsers: Ember.computed('model.@each.hide', 'deleted', 'adminsOnly', 'group', function() {
    let userAccounts = this.get('model').filterBy('hide', this.get('deleted'));

    const group = this.get('group');
    if (group) {
      userAccounts = userAccounts.filterBy('userGroup.id', group);
    }

    if (this.get('adminsOnly')) {
      return userAccounts.filterBy('rights', 3);
    } else {
      return userAccounts;
    }
  }),

  sortedUsers: Ember.computed.sort('filteredUsers', 'sortDefinition'),
  sortDefinition: ['userGroup.name', 'name']
});
