import React from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme'
import Nav from '../Nav/Nav';
import AddPetForm from '../AddPetForm/AddPetForm';
import AddOwnerForm from '../AddOwnerForm/AddOwnerForm';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Router>
      <Nav/>
      <Route exact path='/' component={AddPetForm}/>
      <Route exact path='/manageowners' component={AddOwnerForm}/>
    </Router>
  </MuiThemeProvider>
  );
}

export default App;
