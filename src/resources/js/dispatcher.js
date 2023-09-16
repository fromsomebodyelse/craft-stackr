/**
 * API for dispatching events between windows that have the `window.x`
 * library loaded.
 */
 export const eventDispatcher = (target, streamId) => {
  const handlers = {};

  // Listen for messages being sent to the current window. Received
  // messages are only delegated to their handler if the handler exists
  // and the "key" matches the streamID of the dispatcher. This helps
  // ensure messages from other libraries do not accidently trigger
  // our handlers.

  window.addEventListener('message', (event) => {
    const {key, type, data:message} = event.data;
    const isValidMessage = key === streamId;
    const handler = handlers[type];
    if (isValidMessage && handler) handler(message);
  });

  return {

    /**
     * Listen for messages of the provided name/ID.
     */
    on: (name, handler) => {
      handlers[name] = handler;
    },

    /**
     * Dispatch a message to any regsitered handlers.
     */
    dispatch: (name, message) => {
      target.postMessage({type: name, data: message, key: streamId}, '*');
    }
  };
};
