import SuperAdminsOnly from 'webd2-client-ember/routes/authz-super-admins-only';

export default SuperAdminsOnly.extend({
  model() {
    return this.store.query('user-group', {includeJoined: true});
  }
});
