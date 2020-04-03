import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'config/redux';
import Dashboard from 'modules/dashboard/components/Dashboard';
import ThemeProvider from 'modules/themes/components/ThemeProvider';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <Provider store={configureStore()}>
      <ThemeProvider>
        <Header />
        <Dashboard />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
