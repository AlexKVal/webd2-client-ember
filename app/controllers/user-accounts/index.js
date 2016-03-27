import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['deleted', 'adminsOnly'],
  deleted: false,
  adminsOnly: false,

  filteredUsers: Ember.computed('adminsOnly', 'model', function() {
    const userAccounts = this.get('model');
    const category = this.get('adminsOnly');

    if (category) {
      return userAccounts.filterBy('rights', "3");
    } else {
      return userAccounts;
    }
  })
});
