import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import ComponentDetails from './ComponentDetails';
import ComponentsList from './ComponentsList';
import Preview from './Preview';
import { StackrPage, StackrPageContextProvider } from './StackrPage';

const defaultState = {
  curInstance: null,
  setCurInstance: null,
}

export const InspectorContext = React.createContext();

const Inspector = () => {
  const [curInstance, setCurInstance] = React.useState(null);
  const state = {curInstance, setCurInstance};

  return (
    <InspectorContext.Provider value={state}>
      <StackrPageContextProvider>
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-700">
          <div className="absolute top-0 w-5/6 h-full">
            <Preview>
              <StackrPage url="https://bishopfox.fsedev" />
            </Preview>
          </div>
          <div className="absolute top-0 right-0 w-1/6 h-full">
            <ComponentsList />
            <ComponentDetails instance={curInstance} />
          </div>
        </div>
      </StackrPageContextProvider>
    </InspectorContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
      <Inspector />
  </React.StrictMode>,
  document.getElementById('stackr-root')
);
