import { eventDispatcher } from "./dispatcher";
import { getComponentDepth, getComponentChildren, getComponentParent } from "./utils";

function highlightInstance(id, highlight = true) {
  const el = document.querySelector(`[data-stackr-component="${id}"]`);

  if (el) {
    if (highlight) el.scrollIntoView({block: 'center', behavior: 'smooth'});
    el.classList.toggle('stackr-highlight', highlight);
  }
}

function decorateInstance(id, el, dispatcher) {
  const data = window.stackrComponents[el.getAttribute('data-stackr-component')];
  const stackrDiv = document.createElement('div');

  el.addEventListener('mouseover', (e) => {
    highlightInstance(id);
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


(function() {
  const dispatcher = eventDispatcher(window.parent, "stackr-preview");
  const instances = Object.keys(window.stackrComponents).map(key => {
    const el = decorateInstance(
      key,
      document.querySelector(`[data-stackr-component="${key}"]`),
      dispatcher
    );

    return {
      id: key,
      ...window.stackrComponents[key],
      depth: getComponentDepth(el),
      parent: getComponentParent(el),
      children: getComponentChildren(el),
    };
  });

  // Listen for events from the inspector.
  dispatcher.on('STACKR_HIGHLIGHT_INSTANCE', (obj) => {
    highlightInstance(obj.id, obj.highlight);
  });

  console.log('%c Stackr!2', 'background: #222; color: #bada55');

  dispatcher.dispatch('STACKR_INIT_PAGE', {
    url: document.location.href,
    instances
  });
})();

