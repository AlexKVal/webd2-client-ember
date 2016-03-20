import SuperAdminsOnly from 'webd2-client-ember/routes/authz-super-admins-only';

export default SuperAdminsOnly.extend({
  model(params) {
    return this.store.findRecord('user-account', params.id);
  },
});
