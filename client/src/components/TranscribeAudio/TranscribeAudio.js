import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
// import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import Button from '../../elements/CustomButton/CustomButton';
import avatar from '../../assets/img/faces/face-3.jpg';
import Sidebar from '../Sidebar/Sidebar';
// import Dashboard from '../Dashboard/Dashboard';
import { Card } from '../Card/Card';
import { UserCard } from '../UserCard/UserCard';
import { getFromStorage } from '../utils/storage';
// import { appendFile } from 'fs';

class TranscribeAudio extends Component {
	constructor(props) {
		super(props);
		/* Set State */
		this.state = {
			isLoading: true,
			token: '',
			element1: '',
			element2: '',
			uploadError: '',
			selectedFile: null
		}
		// Binding the audio files & crutch words entered in the selected file & Crutch Words text box to the constructor
		// this.onTextBoxChangeCrutchWords = this.onTextBoxChangeCrutchWords.bind(this);
		this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
	}
	/* Initialization that requires DOM nodes should go here is invoked immediately after a component is mounted */
	componentDidMount() {
		const obj = getFromStorage('papayas_app');
		if (obj && obj.token) {
			const {
				token
			} = obj;
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

	// state = {
	// 	selectedFile: null
	// }

	fileSelectedHandler = event => {
		this.setState({
			selectedFile: event.target.files[0]
		});
		// console.log(event.target.files[0]);
	}

// 	function checkStatus(response) {
// 	if (response.status >= 200 && response.status < 300) {
// 		return response
// 	} else {
// 		var error = new Error(response.statusText)
// 		error.response = response
// 		throw error
// 	}
// }
// function parseJSON(response) {
// 	return response.json()
// }
	/* Get Crutch Words from Text Area */
	// onTextBoxChangeCrutchWords(event) {
	// 	this.setState({
	// 		crutchWords: event.target.value
	// 	});
	// }
	/* Get the Select a File from Upload */
	// onFileChangeAudioFile = event => {
	// 	this.setState({
	// 		audioFile: event.target.files[0]
	// 	});
	// 	console.log(event.target.files[0]);
	// 	// console.log(event.target.files[0].name);
	// 	// console.log(event.target.files[0].size);
	// }

	/* Take Uploaded File & Send to the Back End */
	fileUploadHandler = () => {
		/* Grab State */
		// const {
        //     selectedFile
		// } = this.state;
		// console.log(this.state.selectedFile);
		console.log(this.state.token);

		this.setState({
			isLoading: true,
		});

		const fd = new FormData();
		/* Send File to Backend Server for Transcribing */
		fd.append('file',
			this.state.selectedFile);
		// console.log(this.state.selectedFile);

		const obj = getFromStorage('papayas_app');
            const { token } = obj;
			console.log(obj);
		/* POST Request to Backend. */
		fetch('/api/account/upload/', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body:
				JSON.stringify({
					element1: token,
					element2: fd
			}),
			/* Logging the Progress of Uploading */
			onUploadProgress: progressEvent => {
				console.log('Upload Progress' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
			}
		})
			.then(function (data) {
				console.log('request succeeded with JSON response', data)
			}).catch(function (error) {
				console.log('request failed', error)
			})
			// .then(res => res.json())
			// .then(json => {
			// 	console.log('join', json);
			// 	if (json.success) {
			// 		this.setState({
			// 			uploadError: json.message,
			// 			selectedFile: ''
			// 		});
			// 		console.log(this.setState);
			// 	} else {
			// 		this.setState({
			// 			uploadError: json.message,
			// 		});
			// 		console.log(this.setState);
			// 	}
			// });
	}


	/* End all of functions */

	render() {
		const {
			/* Upload Variables */
			uploadError,
			selectedFile
			// crutchWords
		} = this.state;
		console.log('const variables');
		console.log(this.state.selectedFile);
		// console.log(this.state.crutchWords);
		/* If Audio File & Crutch Words are Not Entered Render these Elements */
		// if (!audioFile && !crutchWords) {
			return (
				<div className='wrapper'>
					<div>
						{
							(uploadError) ? (
								<p>{uploadError}</p>
							):(null)
						}
					<Sidebar {...this.props} />
					<div id='main-panel' className='main-panel'>
						<Grid fluid>
							<Row>
								<Col md={8}>
									<Card title='Upload & Transcribe Audio' content={
										<form>
											<Row>
												<Col md={12}>
													<FormGroup controlId='formControlsTextarea'>
														<ControlLabel>Choose Audio File</ControlLabel>
														<FormControl
															rows='5'
															// style={{ display: 'none' }}
															type='file'
															bsClass='form-control'
															value={this.selectedFile}
															onChange={this.fileSelectedHandler}
															// ref={fileInput => this.fileInput = fileInput}
														/>
													</FormGroup>
												</Col>
											</Row>
											<Button
												bsStyle='info'
												// style={{ display: 'none' }}
												pullRight
												fill
												onClick={this.fileUploadHandler}>
												Upload & Transcribe Audio
											</Button>
											<div className='clearfix'></div>
										</form>
									}
								/>
							</Col>
							<Col md={4}>
								<UserCard
									bgImage='https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400'
									avatar={avatar}
									name='Mike Ignaczak'
									userName='mike1'
									description={
										<span>
											'Like'
											<br />
											'Um'
											<br />
											'Essentially'
											<br />
											'So'
										</span>
									}
									socials={
										<div>
											<Button simple><i className='fa fa-facebook-square'></i></Button>
											<Button simple><i className='fa fa-twitter'></i></Button>
											<Button simple><i className='fa fa-google-plus-square'></i></Button>
										</div>
									}
								/>
								</Col>
							</Row>
						</Grid>
						</div>
					</div>
				</div>
			);
		// }
		// return (
		// 	<Redirect to='/dashboard' component={Dashboard} />
		// );
	}
}

export default TranscribeAudio;