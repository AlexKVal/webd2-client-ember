import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['deleted', 'adminsOnly'],
  deleted: false,
  adminsOnly: false,

  filteredUsers: Ember.computed('model.@each.hide', 'deleted', 'adminsOnly', function() {
    const userAccounts = this.get('model').filterBy('hide', this.get('deleted'));

    if (this.get('adminsOnly')) {
      return userAccounts.filterBy('rights', "3");
    } else {
      return userAccounts;
    }
  }),

  sortedUsers: Ember.computed.sort('filteredUsers', 'sortDefinition'),
  sortDefinition: ['userGroup.name', 'name']
});
