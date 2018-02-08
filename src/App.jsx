import React, { Component } from 'react';
import { Provider } from 'react-redux';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as ReactTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router } from 'react-router-dom';
//import 'normalize.css';
//import './App.css';
import store from './utils/store';
import theme from './utils/theme';

import Nav from './components/Nav';
import Header from './components/Header';
import Results from './components/Results';
import Search from './components/Search';
import Footer from './components/Footer';

ReactTapEventPlugin();

class App extends Component {
  render() {
    return (
      <Provider store={store}>        
        <Router>
          <div>              
            <Nav />              
            <Header />
            <Search />                        
            <Results />
            <Footer />            
          </div>
        </Router>        
      </Provider>
    );
  }
}

export default App;
