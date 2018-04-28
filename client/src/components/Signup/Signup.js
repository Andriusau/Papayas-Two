import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import { getFromStorage } from '../utils/storage';
import Signin from '../Signin/Signin';
class Signup extends Component {
	constructor(props) {
		super(props);
		/* Set State */
        this.state = {
            isLoading: true,
			token: '',
            signUpError: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
			signUpLastName: ''
			// signUpCrutchWords: ''
        };

        /* Binding the values entered in the Sign Up text boxes functions to the constructor */
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
		this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
		// this.onTextboxChangeSignUpCrutchWords = this.onTextboxChangeSignUpCrutchWords.bind(this);

		/* Binding my signup & logout functions to the constructor */
		this.onSignUp = this.onSignUp.bind(this);
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

	// onTextboxChangeSignUpCrutchWords(event) {
	// 	this.setState({
	// 		signUpCrutchWords: event.target.value
	// 	});
	// }

	/* Sign Up Function */
	onSignUp() {
		/* Grab State */
		const {
            signUpEmail,
            signUpPassword,
            signUpFirstName,
			signUpLastName,
			// signUpCrutchWords
        } = this.state;

        this.setState({
            isLoading: true
		});

		/* POST Request to Backend. */
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
				// crutchWords: signUpCrutchWords
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
						signUpLastName: ''
						// signUpCrutchWords: ''
					});
				} else {
					this.setState({
						signUpError: json.message,
						isLoading: false
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
			/* Sign Up Variables */
			signUpError,
			signUpEmail,
			signUpPassword,
			signUpFirstName,
			signUpLastName
			// signUpCrutchWords
		} = this.state;

		/* If all of the above const have values then render a view that includes the following */
		if (isLoading) {
			return (<div><p>Page is Loading... </p></div>);
		}

		/* If the page has finished loading but there is no token when we look for it in getFromStorage, then render these elements */
		if (!token) {
			return (
				<div>
					<div>
						{
							(signUpError) ? (
								<p>{signUpError}</p>
							) : (null)
						}
						<h1>Sign Up!</h1>
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
						<br />
						<button
							onClick={this.onSignUp}>
							Sign Up!
							</button>
					</div>
				</div>
			);
		}
		return (
			<Redirect to='/signin' component={Signin} />
		);
	}
}

export default Signup;