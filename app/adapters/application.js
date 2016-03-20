import DS from 'ember-data';
import Ember from 'ember';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend({
  authorizer: 'authorizer:jwt',
  namespace: 'api/v1',

  /**
    * DataAdapterMixin@1.0.1
   * TODO remove all of this after
   * https://github.com/simplabs/ember-simple-auth/pull/897
   * got resolved
   */
  session: Ember.inject.service('session'),

  ajaxOptions() {
    const authorizer = this.get('authorizer');
    Ember.assert("You're using the DataAdapterMixin without specifying an authorizer. Please add `authorizer: 'authorizer:application'` to your adapter.", Ember.isPresent(authorizer));

    let hash = this._super(...arguments);
    let { beforeSend } = hash;

    hash.beforeSend = (xhr) => {
      this.get('session').authorize(authorizer, (headerName, headerValue) => {
        xhr.setRequestHeader(headerName, headerValue);
      });
      if (beforeSend) {
        beforeSend(xhr);
      }
    };
    return hash;
  },

  /**
   * this is the Fix
   */
  handleResponse (status) {
    if (status === 401 && this.get('session.isAuthenticated')) {
      this.get('session').invalidate();
      return true;
    }

    // return proper errors
    return this._super(...arguments);
  }
});
