import Ember from 'ember';

export default function messageFromError(error) {
  let messages;
  if (Ember.isArray(error.errors)) {
    messages = error.errors.map((error) => {
      return `[${error.title}] ${error.detail}`;
    });
  } else {
    messages = [error.message];
  }
  return messages.join('<br>');
}
