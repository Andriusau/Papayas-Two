import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import NoMatch from './components/NoMatch/NoMatch';

const App = () => (
	<Router>
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/Signup" component={Signup} />
				<Route exact path="/Signin" component={Signin} />
				<Route component={NoMatch} />
			</Switch>
			<Footer />
		</div>
	</Router>
);

export default App;