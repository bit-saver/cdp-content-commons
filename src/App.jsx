import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as ReactTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'normalize.css';
import './App.css';
import store from './utils/store';
import theme from './utils/theme';
import HeaderBar from './components/HeaderBar';
import Results from './components/Results';
import Search from './components/Search';
import Footer from './components/Footer';

ReactTapEventPlugin();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={theme}>
          <Router>
            <div className="App__component">
              <section>
                <HeaderBar />
              </section>
              <section className="content__screen">
                <Search />
              </section>
              <section>
                <Results />
              </section>
              <section>
                <Footer />
              </section>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
