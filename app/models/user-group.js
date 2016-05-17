import Ember from 'ember';
import DS from 'ember-data';

const { attr, hasMany } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  name: attr('string'),
  hide: attr('boolean', { defaultValue: false }),
  info: attr('string'),
  users: hasMany('user', { async: false }), // embedded

  userCount: computed.alias('users.length'),
  hasUsers: computed.gt('userCount', 0),

  canBeDeleted: computed.not('hasUsers')
});
