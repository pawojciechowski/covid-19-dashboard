import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'config/redux';
import Dashboard from 'modules/dashboard/components/Dashboard';

function App() {
  return (
    <Provider store={configureStore()}>
      <Dashboard />
    </Provider>
  );
}

export default App;
