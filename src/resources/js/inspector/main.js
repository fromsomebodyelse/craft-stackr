import React from 'react';
import ReactDOM from 'react-dom';
import { StackrPageContextProvider } from './StackrPage';
import Inspector from './Inspector';

ReactDOM.render(
  <React.StrictMode>
    <StackrPageContextProvider>
      <Inspector />
    </StackrPageContextProvider>
  </React.StrictMode>,
  document.getElementById('stackr-root')
);
