import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../utils/storage';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
			token: '',
			signInError: '',
			signInEmail: '',
			signInPassword: '',
            signUpError: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
			signUpLastName: '',
			signUpCrutchWords: ''
        };

        // Binding the values entered in the Sign Up text boxes functions to the constructor
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
		this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
		this.onTextboxChangeSignUpCrutchWords = this.onTextboxChangeSignUpCrutchWords.bind(this);

		// Binding the values entered in the Sign In text boxes functions to the constructor
        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
		this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

		// Binding my signin, signout & logout functions to the constructor
		this.onSignIn = this.onSignIn.bind(this);
		this.onSignUp = this.onSignUp.bind(this);
		this.onLogOut = this.onLogOut.bind(this);
    }

    // Initialization that requires DOM nodes should go here is invoked immediately after a component is mounted
	componentDidMount() {
		const obj = getFromStorage('papayas_app');
        if (obj && obj.token) {
            const { token } = obj;
			console.log(obj);
			// Verify Token
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

	/*
	* State Changes
	*/
	onTextboxChangeSignUpEmail(event) {
		this.setState({
			signUpEmail: event.target.value
		});
	}

	onTextboxChangeSignUpPassword(event) {
		this.setState({
			signUpPassword: event.target.value
		});
	}

	onTextboxChangeSignUpFirstName(event) {
		this.setState({
			signUpFirstName: event.target.value
		});
	}

	onTextboxChangeSignUpLastName(event) {
		this.setState({
			signUpLastName: event.target.value
		});
	}

	onTextboxChangeSignUpCrutchWords(event) {
		this.setState({
			signUpCrutchWords: event.target.value
		});
	}

	onTextboxChangeSignInEmail(event) {
		this.setState({
			signUpCrutchWords: event.target.value
		});
	}

	onTextboxChangeSignInPassword(event) {
		this.setState({
			signUpCrutchWords: event.target.value
		});
	}

	/*
	* Sign Up Function
	*/
	onSignUp() {
		// Grab State
		const {
            signUpEmail,
            signUpPassword,
            signUpFirstName,
			signUpLastName,
			signUpCrutchWords
        } = this.state;

        this.setState({
            isLoading: true
		});

		// POST Request to Backend.
		fetch('api/account/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName: signUpFirstName,
				lastName: signUpLastName,
				email: signUpEmail,
				password: signUpPassword,
				crutchWords: signUpCrutchWords
			}),
		}).then(res => res.json())
			.then(json => {
				console.log('join', json);
				if (json.success) {
					this.setState({
						signUpError: json.message,
						isLoading: false,
						signUpEmail: '',
						signUpPassword: '',
						signUpFirstName: '',
						signUpLastName: '',
						signUpCrutchWords: ''
					});
				} else {
					this.setState({
						signUpError: json.message,
						isLoading: false
					});
				}
			});
	}

	/*
	* Sign In Function
	*/
	onSignIn() {
		// Grab state
		const {
			signInEmail,
			signInPassword,
		} = this.state;

		this.setState({
			isLoading: true,
		});

		// Post request to backend
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

	/*
	* Logout Function
	*/
	onLogOut() {
		this.setState({
			isLoading: true
		});
		const obj = getFromStorage('papayas_app');
		if (obj && obj.token) {
			const { token } = obj;
			// Verify token
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
	// End all of functions

    render() {
        const {
            isLoading,
			token,
			// Sign Up Const
            signUpError,
            signUpEmail,
			signUpPassword,
			signUpFirstName,
			signUpLastName,
			signUpCrutchWords,
			// Sign In Const
			signInEmail,
			signInPassword,
			signInError
		} = this.state;

		// If all of the above const have values then render a view that includes the following
		if (isLoading) {
			return (<div><p>Page is Loading...</p></div>);
		}

		// If the page has finished loading but there is no token when we look for it in getFromStorage, then render these elements
		if (!token) {
			return (
				<div>
					<div>
						{
							(signInError) ? (
								<p>{signInError}</p>
							) : (null)
						}
						/*
						* Sign In React HTML
						*/
						<p>Sign In!</p>
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
						<button onClick={this.onSignIn}>Sign In</button>
					</div>
					<br />
					<br />
					<div>
						{
							(signUpError) ? (
								<p>{signUpError}</p>
							) : (null)
						}
						/*
						* Sign Up React HTML
						*/
						<p>Sign Up!</p>
						<input
							type='text'
							placeholder='First Name'
							value={signUpFirstName}
							onChange={this.onTextboxChangeSignUpFirstName}
							/>
						<br />
						<input
							type='text'
							placeholder='Last Name'
							value={signUpLastName}
							onChange={this.onTextboxChangeSignUpLastName}
							/>
						<br />
						<input
							type='email'
							placeholder='Email'
							value={signUpEmail}
							onChange={this.onTextboxChangeSignUpEmail}
							/>
						<br />
						<input
							type='password'
							placeholder='Password'
							value={signUpPassword}
							onChange={this.onTextboxChangeSignUpPassword}
							/>
						<br />
						<input
							type='text'
							placeholder='Enter Your Crutch Words Here & Separate Each Word by a Comma'
							value={signUpCrutchWords}
							onChange={this.onTextboxChangeSignUpCrutchWords}
							/>
						<br />
						<br />
						<button onClick={this.onSignUp}>Sign Up!</button>
					</div>
				</div>
			);
		}
		/*
		* Log Out React HTML
		*/
		return (
			<div>
				<p>Account</p>
				<button onClick={this.onLogOut}>Log Out!</button>
			</div>
		);
    }
}

export default Signup;