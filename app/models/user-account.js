import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  password: DS.attr('string'),
  rights: DS.attr(),
  userGroup: DS.belongsTo('userGroup'),

  _updateLoginModels() {
    this.get('store').findAll('user-group');
  },

  didUpdate() {
    this._updateLoginModels();
  },

  didCreate() {
    this._updateLoginModels();
  },

  didDelete() {
    this._updateLoginModels();
  }
});
