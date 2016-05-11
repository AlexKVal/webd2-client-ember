import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  name: attr('string'),
  hide: attr('boolean', { defaultValue: false }),
  info: attr('string'),
  users: hasMany('user')
});
