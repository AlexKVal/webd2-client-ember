import SuperAdminsOnly from 'webd2-client-ember/routes/authz-super-admins-only';
import Flash from 'webd2-client-ember/mixins/flash';

export default SuperAdminsOnly.extend(Flash, {
  model() {
    // sideload joined relations to show them on the index/List screen
    return this.store.query('user-account', { includeJoined: true });
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
      .then(() => this.transitionTo('user-accounts.index', {queryParams: {deleted: false}}))
      .catch((errors) => {
        this.flashStickyErrors(errors);
        item.rollbackAttributes();
      });
    }
  }
});
