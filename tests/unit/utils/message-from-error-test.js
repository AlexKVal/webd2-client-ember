import messageFromError from 'webd2-client-ember/utils/message-from-error';
import { module, test } from 'qunit';

module('Unit | Utility | message from error');

test('it compiles one error message for "flashMessages"', function(assert) {
  const error = {
    message: 'this is an error message',
    errors: [
      {
        title: 'title-1',
        detail: 'error detail - 1'
      },
      {
        title: 'title-2',
        detail: 'error detail - 2'
      }
    ]
  };

  const expected = "[title-1] error detail - 1<br>[title-2] error detail - 2";

  const result = messageFromError(error);
  assert.ok(result);
  assert.equal(result, expected);
});

test('it returns error.message unless error.errors are present', function(assert) {
  const error = {
    message: 'this is an error message'
  };

  const expected = "this is an error message";

  const result = messageFromError(error);
  assert.equal(result, expected);
});
