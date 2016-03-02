import DS from 'ember-data';

import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api/v1',
  host: config.APP.apiHost
});
