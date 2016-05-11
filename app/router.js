import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user-accounts', function() {
    this.route('edit', { path: ':id/edit' });
    this.route('new');
  });
  this.route('login', function() {
    this.route('users', { path: ':group_id/users' }, function() {
      this.route('auth', { path: ':user_id/auth' });
    });
  });
  this.route('options');
  this.route('settled-accounts');
  this.route('user-groups');
});

export default Router;
