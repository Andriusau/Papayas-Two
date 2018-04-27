import React, { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Container from './components/Container/Container';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Logout from './components/Logout/Logout';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/UserProfile/UserProfile';
import TranscribeAudio from './components/TranscribeAudio/TranscribeAudio';
import { BrowserRouter as Router, Route } from 'react-router-dom';
class App extends Component {
  render() {
	  return (
		  <Router>
			  <div>
				  <Header />
				  <Container>
					  <Route exact path='/' component={Signup} />
					  <Route exact path='/signin' component={Signin} />
					  <Route exact path='/user' component={UserProfile} />
					  <Route exact path='/dashboard' component={Dashboard} />
					  <Route exact path='/logout' component={Logout} />
					  <Route exact path='/transcribe' component={TranscribeAudio} />
				  </Container>
				  <Footer />
			  </div>
		  </Router>
	  );
  }
}

export default App;
