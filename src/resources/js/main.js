import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ComponentDetails from './ComponentDetails';
import ComponentsList from './ComponentsList';
import { getComponentChildren, getComponentParent, highlightComponent } from './utils';
import useKeyPress from './hooks/useKeyPress';
// import './index.css';
// import App from './App';

function decorateComponent(element) {
  const data = window.stackrComponents[element.getAttribute('data-stackr-component')];
  const stackrDiv = document.createElement('div');
  stackrDiv.classList.add('stackr-debug');
  element.appendChild(stackrDiv);

  return element;
}

const Inspector = () => {
  const [curInstance, setCurInstance] = useState(null);
  const [instanceElements, setInstanceElements] = useState([]);
  const [show, setShow] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const componentUnderPoint = document.elementsFromPoint(e.clientX, e.clientY)
    .find(el => el.getAttribute('data-stackr-component'));

    if (componentUnderPoint) {
      const instanceId = componentUnderPoint.getAttribute('data-stackr-component')
      highlightComponent(instanceId);
    }
  });

  useKeyPress('ArrowUp', () => {
    setShow(!show);
  });

  useEffect(() => {

    window.addEventListener('mousemove', handleMouseMove);

    // Loop through all stackr component instances and look for
    // the associated HTML element.
    const instances = Object.keys(window.stackrComponents).map(key => {
      const el =  document.querySelector(`[data-stackr-component="${key}"]`);
      decorateComponent(el);
      return el;
    });

    setInstanceElements(instances);
  }, []);

  if (!show) return null;

  return (
    <div>
      <ComponentsList setInstance={setCurInstance}/>
      { curInstance && <ComponentDetails instance={curInstance} setInstance={setCurInstance} /> }
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Inspector />
  </React.StrictMode>,
  document.getElementById('stackr-root')
);
