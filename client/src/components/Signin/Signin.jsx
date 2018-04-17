import React, { Component } from 'react';
import { getFromStorage, setInStorage } from '../../utils/storage.jsx';
import { getFromStorage, setInStorage } from '../utils/storage';
import 'whatwg-fetch';

class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            signInEmail: '',
            signInPassword: ''
        };

        // Binding these State Changes to React Component
        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
		this.onSignIn = this.onSignIn.bind(this);
		this.onLogOut = this.onLogOut.bind(this);
    }

    // Initialization that requires DOM nodes should go here is invoked immediately after a component is mounted
    componentDidMount() {
		const obj = getFromStorage('the_main_app');
		console.log(obj);
		console.log(obj.token);
        if (obj && obj.token) {
            const { token } = obj;
			console.log(obj);
			// Verify Token
            fetch('/api/account/verify?token=' + token)
                .then(res => res.json()).then(json => {
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

    // Sign Up Function
    onSignIn() {
        // Grab State
        const {
            signInEmail,
            signInPassword
        } = this.state;

        this.setState({
            isLoading: true
        });
        console.log(this.state);
        // POST Request to Backend.
        fetch('api/account/signin', {
                method: 'POST',
                body: JSON.stringify({
                    email: signInEmail,
					password: signInPassword
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(res => res.json())
            .then(json => {
				if (json.success) {
					setInStorage('the_main_app', { token: json.token });
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                        signInEmail: '',
                        signInPassword: '',
						token: json.token
                    });
                } else {
                    this.setState({
                        signInError: json.message,
                        isLoading: false
                    });
                }
			});
	}

	// Log Out Function
	onLogOut() {
		this.setState({
			isLoading: true
		});
		const obj = getFromStorage('the_main_app');
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

	// Functions that Occurs When the Event Parameter Changes the Props State
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
		if (!token) {
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
		return (
			<div>
				<p>Account</p>
				<button onClick={this.onLogOut}>Log Out!</button>
			</div>
		);
    }
}

export default Signin;