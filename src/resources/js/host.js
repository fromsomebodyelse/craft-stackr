import { eventDispatcher } from "./dispatcher";
import { getComponentDepth, getComponentChildren, getComponentParent } from "./utils";

function decorateInstance(el) {
  const data = window.stackrComponents[el.getAttribute('data-stackr-component')];
  const stackrDiv = document.createElement('div');
  stackrDiv.classList.add('stackr-debug');
  el.appendChild(stackrDiv);

  return el;
}


(function() {
  const instances = Object.keys(window.stackrComponents).map(key => {
    const el = decorateInstance(document.querySelector(`[data-stackr-component="${key}"]`));

    return {
      id: key,
      ...window.stackrComponents[key],
      depth: getComponentDepth(el),
      parent: getComponentParent(el),
      children: getComponentChildren(el),
    };
  });

  const dispatcher = eventDispatcher("stackr-preview");

  // Listen for events from the inspector.
  dispatcher.on('STACKR_HIGHLIGHT_INSTANCE', (obj) => {
    const el = document.querySelector(`[data-stackr-component="${obj.id}"]`);

    if (el) {
      if (obj.highlight) el.scrollIntoView({block: 'center', behavior: 'smooth'});
      el.classList.toggle('stackr-highlight', obj.highlight);
    }
  });

  console.log('%c Stackr!2', 'background: #222; color: #bada55');

  dispatcher.dispatch(window.parent, 'STACKR_INIT_PAGE', {
    url: document.location.href,
    instances
  });
})();

