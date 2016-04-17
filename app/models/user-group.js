import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  hide: DS.attr('boolean', { defaultValue: false }),
  users: DS.hasMany('user')
});
