import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('users', function() {
    this.route('edit', { path: ':id/edit' });
  });
  this.route('login', function() {
    this.route('users', { path: ':group_id/users' });
  });
});

export default Router;
