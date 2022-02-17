import React, { useEffect, useRef, useState } from 'react';
import { eventDispatcher } from './dispatcher';

const defaultPageData = {
  url: null,
  instances: [],
  mouseOver: [],
};

const StackrPageContext = React.createContext();

const StackrPageContextProvider = ({children}) => {
  const [pageData, setPageData] = useState(defaultPageData);
  const [mouseOver, setMouseOver] = useState([]);
  const dispatcher = useRef(null);

  const state = {...pageData, mouseOver, actions: {
    highlightInstance: (id, highlight = true) => {
      if (dispatcher.current) {
        dispatcher.current.dispatch('STACKR_HIGHLIGHT_INSTANCE', {id, highlight});
      }
    }
  }};

  const onMouseOutInstance = (instance) => {
    setMouseOver(mouseOver.filter(item => item.id !== instance.id));
  }

  const onMouseOverInstance = (instance) => {
    setMouseOver([...mouseOver, instance]);
  }

  useEffect(() => {
    const iframe = document.querySelector('iframe#stackr-page').contentWindow;
    // The host page will dispatch an event containing the pages's
    // component tree.
    dispatcher.current = eventDispatcher(iframe, 'stackr-preview');
    dispatcher.current.on('STACKR_INIT_PAGE', (data) => setPageData(data));
    dispatcher.current.on('STACKR_INSTANCE_MOUSE_OVER', (data) => onMouseOverInstance(data));
    dispatcher.current.on('STACKR_INSTANCE_MOUSE_OUT', (data) => onMouseOutInstance(data));
  }, []);

  return (
    <StackrPageContext.Provider value={state}>
      {children}
    </StackrPageContext.Provider>
  );
}

const StackrPage = ({url}) => {
  const iframe = useRef(null);
  return <iframe id="stackr-page" ref={iframe} className="w-full h-full bg-white" src={url}/>;
}

export { StackrPageContext, StackrPageContextProvider,StackrPage };
