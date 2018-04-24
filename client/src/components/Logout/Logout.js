import React, { Component } from 'react';
import { getFromStorage, setInStorage } from '../utils/storage';
import 'whatwg-fetch';

class Logout extends Component {

	// Log Out Function
	onLogOut() {
		this.setState({
			isLoading: true
		});
		const obj = getFromStorage('papayas_app');
		if (obj && obj.token) {
			const { token } = obj;
			// Logout Takes a Query Param of Token
			fetch('/api/account/logout?token=' + token).then(res => res.json()).then(json => {
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

    render() {
        const {
            isLoading,
            token,
            signInError,
            signInEmail,
			signInPassword
		} = this.state;
		// If all of the above const have values then render a view that includes the following
		if (isLoading) {
			return (
				<div>
					<p>Page is Loading...</p>
				</div>
			);
		}
		// If the page has finished loading but there is no token when we look for it in getFromStorage, then render these elements
		if (token) {
			return (
				<div>
					<p>Account</p>
					<button onClick={this.onLogOut}>Log Out!</button>
				</div>
			);
			return (
				<div>
					<div>
						{signInError ? <p>{signInError}</p> : null}
						<p>Sign In!</p>
						<input
							type='email'
							placeholder='Email'
							value={signInEmail}
							onChange={this.onTextboxChangeSignInEmail}
							/>
						<br />
						<input
							type='password'
							placeholder='Password'
							value={signInPassword}
							onChange={this.onTextboxChangeSignInPassword}
							/>
						<br />
						<button onClick={this.onSignIn}>Sign Up!</button>
					</div>
				</div>
			);
		}
    }
}

export default Logout;