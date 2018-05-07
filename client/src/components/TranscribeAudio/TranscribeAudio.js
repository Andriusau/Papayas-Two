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
			selectedFile: null,
			transcription: '',
			crutchWords: '',
			count: ''
		}
		/* Binding the audio files & crutch words entered in the selected file & Crutch Words text box to the constructor */
		this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
	}
	/* Initialization that requires DOM nodes should go here is invoked immediately after a component is mounted */
	componentDidMount() {
		const obj = getFromStorage('papayas_app');
		if (obj && obj.token) {
			const { token } = obj;
			console.log('token: \n' + token);
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

	/* Get the Select a File from Upload */
	fileSelectedHandler = event => {
		this.setState({
			selectedFile: event.target.files[0]
		});
		console.log(event.target.files);
	}

	/* Take Uploaded File & Send to the Back End */
	fileUploadHandler = () => {
		/* Grab State */
		const {
			transcription
		} = this.state;

		this.setState({
			isLoading: true,
		});

		/* Send File to Backend Server for Transcribing */
		const obj = getFromStorage('papayas_app');
            const { token } = obj;

		/* POST Request to Backend in Development. */
		// const root = 'http://localhost:3001';
		// let uri = root + '/api/account/upload';

		/* POST Request to Backend in Production. */
		let uri = '/api/account/upload';

		const formData = new FormData();
		formData.append('element1', token);
		formData.append('element2', this.state.selectedFile);

		const options = {
			method: 'POST',
			mode: 'cors',
			body: formData
		}
		const req = new Request(uri, options);
		console.log(options.body);

		fetch(req)
			.then(res => res.json())
			.then(json => {
				console.log('json:', json);
				console.log('transcription:', json.transcription);
					if(json.success){
						this.setState({
							transcription: json.transcription,
							// crutchWords: json.crutchWords.words,
							// count: json.crutchWords.count,
							isLoading: false
						});
						console.log(this.state);
					}else{
						this.setState({
							signInError: json.message,
							isLoading: false
						})
					}
			})
			.catch(function (error) {
				console.log('request failed', error)
			});
	}


	/* End all of functions */

	render() {
		const {
			/* Upload Variables */
			uploadError,
			transcription,
			isLoading
		} = this.state;
		console.log('Selected File:');
		console.log(this.state.selectedFile);
		console.log(transcription);
		/* If the Audio File Has Not Been Uploaded & Transcribed Render this */
		if (isLoading) {
			return (<div><h3>Please Wait While We Transcribe You're Audio...</h3></div>);
		}
		if (!transcription) {
			return (
				<div className='wrapper'>

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
			);
		}
		/* If the Audio File Has Been Uploaded & Transcribed Render this */
		return (
			<div className="TranscriptionItems">
				<h3>Latest Transcriptions</h3>
				<p>{this.state.transcription}</p>
				<Button
					bsStyle='info'
					// style={{ display: 'none' }}
					pullRight
					fill
					onClick={this.fileUploadHandler}>
					Find Your Crutch Words
				</Button>
				<div className='clearfix'></div>
			</div>
		);
	}
}

export default TranscribeAudio;