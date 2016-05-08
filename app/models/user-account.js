import DS from 'ember-data';

const {attr, belongsTo} = DS;

export default DS.Model.extend({
  name: attr('string'),
  password: attr('string'),
  cardcode: attr('string'),
  rights: attr('number'),
  userGroup: belongsTo('userGroup', {async: false}), // it is sideloaded
  hide: attr('boolean', { defaultValue: false }),

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
