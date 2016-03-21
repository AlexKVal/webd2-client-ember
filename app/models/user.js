import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  group: DS.belongsTo('user-group')
});
