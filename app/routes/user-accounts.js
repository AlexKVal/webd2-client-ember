import SuperAdminsOnly from 'webd2-client-ember/routes/authz-super-admins-only';

export default SuperAdminsOnly.extend({
  model() {
    // sideload joined relations to show them on the index/List screen
    return this.store.query('user-account', { includeJoined: true });
  }
});
