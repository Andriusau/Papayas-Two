import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../utils/storage';
import TranscribeAudio from '../TranscribeAudio/TranscribeAudio';

class Signin extends Component {
	constructor(props) {
		super(props);
		/* Set State */
        this.state = {
            isLoading: true,
			token: '',
			signInError: '',
			signInEmail: '',
			signInPassword: '',
			redirect: true
        };

		/* Binding the values entered in the Sign In text boxes functions to the constructor */
        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
		this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

		/* Binding my signup, signout & logout functions to the constructor */
		this.onSignIn = this.onSignIn.bind(this);
		this.onLogOut = this.onLogOut.bind(this);
	}

	/* Initialization that requires DOM nodes should go here is invoked immediately after a component is mounted */
	componentDidMount() {
		const obj = getFromStorage('papayas_app');
        if (obj && obj.token) {
            const { token } = obj;
			console.log(obj);
			/* Verify Token */
            fetch('/api/account/verify?token=' + token)
				.then(res => res.json())
				.then(json => {
                    if (json.success) {
                        this.setState({
                            token,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoading: false
                        });
                    }
                })
		} else {
			this.setState({
				isLoading: false
			});
		}
	}

	/* State Changes to handle click events */
	onTextboxChangeSignInEmail(event) {
		this.setState({
			signInEmail: event.target.value
		});
	}

	onTextboxChangeSignInPassword(event) {
		this.setState({
			signInPassword: event.target.value
		});
	}

	/* Sign In Function */
	onSignIn() {
		/* Grab state */
		const {
			signInEmail,
			signInPassword,
		} = this.state;

		this.setState({
			isLoading: true,
		});

		/* Post request to backend */
		fetch('/api/account/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: signInEmail,
				password: signInPassword,
			}),
		}).then(res => res.json())
			.then(json => {
				console.log('json', json);
				if (json.success) {
					setInStorage('papayas_app', { token: json.token });
					this.setState({
						signInError: json.message,
						isLoading: false,
						signInPassword: '',
						signInEmail: '',
						token: json.token,
					});
				} else {
					this.setState({
						signInError: json.message,
						isLoading: false,
					});
				}
			});
	}

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
			isLoading,
			token,
			/* Sign In Variables */
			signInError,
			signInEmail,
			signInPassword
		} = this.state;

		/* If all of the above const have values then render a view that includes the following */
		if (isLoading) {
			return (<div><p>Page is Loading...</p></div>);
		}
		/* If the page has finished loading but there is no token when we look for it in getFromStorage, then render these elements */
		if (!token) {
			return (
				<div>
					<div>
					{
						(signInError) ? (
							<p>{signInError}</p>
						) : (null)
					}
					<h1>Sign In!</h1>
					<input
						type="email"
						placeholder="Email"
						value={signInEmail}
						onChange={this.onTextboxChangeSignInEmail}
					/>
					<br />
					<input
						type="password"
						placeholder="Password"
						value={signInPassword}
						onChange={this.onTextboxChangeSignInPassword}
					/>
					<br />
					<br />
					<button
						onClick={this.onSignIn}>
						Sign In</button>
					</div>
				</div>
			);
		}
		return (
			<Redirect to='/transcribe' component={TranscribeAudio} />
		);
	}

}

export default Signin;