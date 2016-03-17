import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';

const { isEmpty } = Ember;

export default BaseAuthorizer.extend({
  authorize(data, block) {
    if (!isEmpty(data.token)) {
      block('Authorization', `Bearer ${data.token}`);
    }
  }
});
