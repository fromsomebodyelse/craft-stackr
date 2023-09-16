import { eventDispatcher } from "./dispatcher";
import { getComponentDepth, getComponentChildren, getComponentParent } from "./utils";

function highlightInstance(id, highlight = true, scrollIntoView = true) {
  const el = document.querySelector(`[data-stackr-component="${id}"]`);

  if (el) {
    if (scrollIntoView && highlight) el.scrollIntoView({block: 'center', behavior: 'smooth'});
    el.classList.toggle('stackr-highlight', highlight);
  }
}

function decorateInstance(id, el, dispatcher) {

  if (!el) {
    console.warn('decorateInstance: no element found for id', id);
    return;
  }

  const data = window.stackrComponents[el.getAttribute('data-stackr-component')];
  const stackrDiv = document.createElement('div');

  el.addEventListener('mouseover', (e) => {
    highlightInstance(id, true, false);
    dispatcher.dispatch('STACKR_INSTANCE_MOUSE_OVER', id);
  });

  el.addEventListener('mouseout', (e) => {
    highlightInstance(id, false);
    dispatcher.dispatch('STACKR_INSTANCE_MOUSE_OUT', id);
  });

  stackrDiv.classList.add('stackr-debug');
  el.appendChild(stackrDiv);

  return el;
}

function getInstances(inspector) {

  // Listen for events from the inspector.
  inspector.on('STACKR_HIGHLIGHT_INSTANCE', (obj) => {
    highlightInstance(obj.id, obj.highlight);
  });

  return Object.keys(window.stackrComponents).map(key => {
    const el = decorateInstance(
      key,
      document.querySelector(`[data-stackr-component="${key}"]`),
      inspector
    );

    return !el ? null : {
      id: key,
      ...window.stackrComponents[key],
      depth: getComponentDepth(el),
      parent: getComponentParent(el),
      children: getComponentChildren(el),
    };
  }).filter(c => c !== null);
}


(function() {
  const inspector = eventDispatcher(window.parent, "stackr-inspector");
  const url = document.location.href;

  // 1. Notify the inspector that we're ready.
  console.log('Stackr-Host: Sending host ready message...');
  inspector.dispatch('STACKR_HOST_READY', {url});

  console.log('Stackr-Host: Waiting for inspector to connect...');

  // 2. Wait for the Inspector to start.
  inspector.on('STACKR_INSPECTOR_CONNECT', () => {
    inspector.dispatch('STACKR_HOST_CONNECTED', {
      url,
      instances: getInstances(inspector)
    });
  });
})();

