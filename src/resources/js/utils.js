/**
 * Returns the element associated with the provide instance ID.
 */
export const getComponentEl = (instanceId) => {
  return document.querySelector(`[data-stackr-component="${instanceId}"]`);
}

/**
 * Returns the depth of the provided element.
 */
export const getComponentDepth = (el) => {
  let depth = 0;
  let node = el;
  // Increase depth until we reach the root (root has depth 0)
  while ((node = node.parentElement)) {
      if (node.hasAttribute('data-stackr-component')) {
        depth++;
      }
  }

  return depth;
}

/**
 * Returns the direct children of the provided element.
 */
export const getComponentChildren = (el) => {
  const children = Array.from(el.querySelectorAll('[data-stackr-component]'));
  return children.filter((child) => {
      return getComponentParent(child) === el;
  }).map((el) => {
    return el.getAttribute('data-stackr-component');
  });
}

/**
 * Returns the parent component of the provided element.
 */
export const getComponentParent = (el) => {
  let parent = el;
  while ((parent = parent.parentElement) && !parent.hasAttribute('data-stackr-component'));
  return parent ? parent.getAttribute('data-stackr-component') : null;
}


export const highlightComponent = (instanceId, show = true) => {
  Array.from(document.querySelectorAll('.stackr-highlight')).forEach((el) => {
    el.classList.remove('stackr-highlight');
  });

  getComponentEl(instanceId).classList.toggle('stackr-highlight', show);
}