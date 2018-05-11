import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import { getFromStorage } from '../utils/storage';
import Signin from '../Signin/Signin';

class Logout extends Component {
	constructor(props) {
		super(props);
		/* Set State */
        this.state = {
            isLoading: true,
			token: ''
			// redirect: true
        };
		/* Binding Logout functions to the constructor */
		this.onLogOut = this.onLogOut.bind(this);
	}

	/* Initialization that requires DOM nodes should go here is invoked immediately after a component is mounted */
	// componentDidMount() {
	// 	const obj = getFromStorage('papayas_app');
	// 	const { token } = obj;
	// }

	/* Logout Function */
	onLogOut() {
		this.setState({
			isLoading: true
		});
		const obj = getFromStorage('papayas_app');
		if (obj && obj.token) {
			const { token } = obj;
			/* Verify token */
			fetch('/api/account/logout?token=' + token)
				.then(res => res.json())
				.then(json => {
					if (json.success) {
						this.setState({
							token: '',
							isLoading: false
						});
					} else {
						this.setState({
							isLoading: false
						});
					}
				});
		} else {
			this.setState({
				isLoading: false
			});
		}
	}
	/* End all of functions */

	render() {
		const {
			token
		} = this.state;

		/* If all of the above const have values then render a view that includes the following */
		// if (isLoading) {
		// 	return (<div><p>Page is Loading...</p></div>);
		// }
		/* If the page has finished loading but there is no token when we look for it in getFromStorage, then render these elements */
		if (!token) {

			return (
				<div>
					<div>
					<h1>Log Out!</h1>
					<br />
					<br />
					<button
					onClick={this.onLogOut}>
					Log Out</button>
					</div>
					</div>
						)
					}
		return (
		<Redirect to='/signin' component={Signin} />
	);
	}

}

export default Logout;