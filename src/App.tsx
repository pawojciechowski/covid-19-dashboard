import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'config/redux';
import Dashboard from 'modules/dashboard/components/Dashboard';
import ThemeProvider from 'modules/themes/components/ThemeProvider';
import ThemeToggle from 'modules/themes/components/ThemeToggle';

function App() {
  return (
    <Provider store={configureStore()}>
      <ThemeProvider>
        <ThemeToggle />
        <Dashboard />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
