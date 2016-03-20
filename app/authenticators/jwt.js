import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import ENV from '../config/environment';

const { RSVP: { Promise }, isEmpty, run, $ } = Ember;

export default BaseAuthenticator.extend({
  restore(data) {
    if (!isEmpty(data.token)) {
      return Promise.resolve(data);
    } else {
      return Promise.reject();
    }
  },

  authenticate(credentials) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: ENV.JWT.tokenEndpoint || '/api/auth',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(credentials),
        contentType: 'application/vnd.api+json'
      })
      .then(
        (response) => run(null, resolve, response),
        (xhr) => {
          run(null, reject, xhr.responseJSON || xhr.responseText);
        }
      );
    });
  },

  invalidate() {
    return Promise.resolve();
  }
});
