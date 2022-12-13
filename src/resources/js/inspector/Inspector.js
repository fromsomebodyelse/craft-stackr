import React from 'react';
import ComponentDetails from './ComponentDetails';
import ComponentsList from './ComponentsList';
import Preview from './Preview';
import { StackrPage } from './StackrPage';

const defaultState = {
  curInstance: null,
  setCurInstance: null,
  url: null,
}

export const InspectorContext = React.createContext(defaultState);

const Inspector = () => {
  const [curInstance, setCurInstance] = React.useState(null);
  const [url] = React.useState(window.inspectUrl || null);
  const state = {curInstance, setCurInstance, url};

  return (
    <InspectorContext.Provider value={state}>
      {/* WIP <div class="w-full h-16 border-2 border-green-500">
        <Preview>
          <iframe src="/" class="w-full h-full" />
        </Preview>
      </div> */}
      <div className="fixed top-0 left-0 w-screen h-screen bg-gray-700">
        <div className="absolute top-0 w-5/6 h-full">
          <Preview>
            <StackrPage {...{url}} />
          </Preview>
        </div>
        <div className="absolute top-0 right-0 w-1/6 h-full">
          <ComponentsList />
          <ComponentDetails instance={curInstance} />
        </div>
      </div>
    </InspectorContext.Provider>
  );
}

export default Inspector;