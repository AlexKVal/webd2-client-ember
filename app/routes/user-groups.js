import SuperAdminsOnly from 'webd2-client-ember/routes/authz-super-admins-only';

export default SuperAdminsOnly.extend({
  model() {
    return this.store.query('user-group', {includeJoined: true});
  },

  actions: {
    delete(item) {
      item.set('hide', true);
      item.save()
      .then(() => this.flashSuccess(`${item.get('name')} has been deleted`))
      .catch((errors) => {
        this.flashStickyErrors(errors);
        item.rollbackAttributes();
      });
    },

    restore(item) {
      item.set('hide', false);
      item.save()
      .then(() => this.flashSuccess(`${item.get('name')} has been restored`))
      .then(() => this.transitionTo('user-groups.index', {queryParams: {deleted: false}}))
      .catch((errors) => {
        this.flashStickyErrors(errors);
        item.rollbackAttributes();
      });
    }
  }
});
