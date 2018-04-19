import React, { Component } from 'react';
import 'whatwg-fetch';
import {
	getFromStorage,
	setInStorage
} from '../utils/storage.jsx';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
			signUpLastName: '',
			signUpCrutchWords: ''
        };

        // Binding these State Changes to React Component
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
		this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
		this.onTextboxChangeSignUpCrutchWords = this.onTextboxChangeSignUpCrutchWords.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }

    // Initialization that requires DOM nodes should go here is invoked immediately after a component is mounted
	componentDidMount() {
		// this.setState({
		// 	isLoading: true
		// });
		const obj = getFromStorage('the_main_app');
		console.log(obj);
		console.log(obj.token);
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

    // Sign Up Function
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
        console.log(this.state);
        // POST Request to Backend.
        fetch('api/account/signup', {
                method: 'POST',
                body: JSON.stringify({
                    firstName: signUpFirstName,
                    lastName: signUpLastName,
                    email: signUpEmail,
					password: signUpPassword,
					crutchWords: signUpCrutchWords
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(res => res.json())
            .then(json => {
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

    render() {
        const {
            isLoading,
            token,
            signUpError,
            signUpEmail,
			signUpPassword,
			signUpFirstName,
			signUpLastName,
			signUpCrutchWords
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
						{signUpError ? <p>{signUpError}</p> : null}
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
						<button onClick={this.onSignUp}>Sign Up!</button>
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

export default Signup;