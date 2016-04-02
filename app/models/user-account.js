import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  password: DS.attr('string'),
  rights: DS.attr('number'),
  userGroup: DS.belongsTo('userGroup'),
  hide: DS.attr('boolean', { defaultValue: false }),

  _updateLoginModels() {
    this.get('store').findAll('user-group');
  },

  didUpdate() {
    this._updateLoginModels();
  },

  didCreate() {
    this._updateLoginModels();
  }
});
