import Ember from 'ember';
import DS from 'ember-data';

const { attr, belongsTo } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  name: attr('string'),
  password: attr('string'),
  cardcode: attr('string'),
  rights: attr('number'),
  userGroup: belongsTo('userGroup', {async: false}), // it is sideloaded
  hide: attr('boolean', { defaultValue: false }),

  // TODO implement the real check
  canBeDeleted: computed('name', 'rights', function() {
    const name = this.get('name');
    const rights = this.get('rights');

    return !/Admin/.test(name) && rights !== 3;
  }),

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
