import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footers from './components/Footers';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';

//hello


const App = () => {
  return (

    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/login' component={LoginScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/forgotPassword' component={ForgotPasswordScreen} exact />
          <Route path='/resetPassword/:token' component={NewPasswordScreen} exact />

        </Container>
      </main>
      <Footers />


    </Router>
  );
};

export default App;
