import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  password: DS.attr('string'),
  rights: DS.attr(),
  belongsTo: DS.attr('user-group')
});
