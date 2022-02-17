import React, { useEffect, useRef, useState } from 'react';
import { eventDispatcher } from './dispatcher';

const defaultPageData = {
  url: null,
  instances: [],
};

const StackrPageContext = React.createContext();

const StackrPageContextProvider = ({children}) => {
  const [pageData, setPageData] = useState(defaultPageData);
  const [dispatcher] = useState(eventDispatcher("stackr-preview"));

  const state = {...pageData, actions: {
    highlightInstance: (id, highlight = true) => {
      const iframe = document.querySelector('iframe#stackr-page').contentWindow;
      dispatcher.dispatch(iframe, 'STACKR_HIGHLIGHT_INSTANCE', {id, highlight});
    }
  }};

  useEffect(() => {
    // The host page will dispatch an event containing the pages's
    // component tree.
    dispatcher.on('STACKR_INIT_PAGE', (data) => setPageData(data));
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
