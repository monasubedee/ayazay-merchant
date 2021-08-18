import React from 'react';
import MomentUtils from '@date-io/moment';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';
import {
  ScrollReset,
  GoogleAnalytics,
  CookiesNotification
} from './components';

import { SnackbarProvider } from 'notistack';

import { AuthProvider } from './context/AuthContext';
import { routWithFetchProvider as FetchProvider } from './context/FetchContext';

import theme from './theme';
import routes from './routes';

import configureStore from './store/store';

const store = configureStore();

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            maxSnack={3}
          >
            <AuthProvider>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <FetchProvider>
                  <ScrollReset />
                  <GoogleAnalytics />
                  <CookiesNotification />
                  {renderRoutes(routes)}
                </FetchProvider>
              </MuiPickersUtilsProvider>
            </AuthProvider>
          </SnackbarProvider>
        </Router>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
