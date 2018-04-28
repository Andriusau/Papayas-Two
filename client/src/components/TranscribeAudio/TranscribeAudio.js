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
// import { appendFile } from 'fs';

class TranscribeAudio extends Component {
	constructor(props) {
		super(props);
		/* Set State */
		this.state = {
			uploadError: '',
			audioFile: '',
			crutchWords: ''
		}
		console.log(this.state.audioFile);
		// Binding the audio files & crutch words entered in the selected file & Crutch Words text box to the constructor
		this.onTextBoxChangeCrutchWords = this.onTextBoxChangeCrutchWords.bind(this);
		this.onFileChangeAudioFile = this.onFileChangeAudioFile.bind(this);
	}
	/* Get Crutch Words from Text Area */
	onTextBoxChangeCrutchWords(event) {
		this.setState({
			crutchWords: event.target.value
		});
		console.log(event.target.value);
	}
	/* Get the Select a File from Upload */
	onFileChangeAudioFile = event => {
		this.setState({
			audioFile: event.target.files[0]
		});
		console.log(event.target.files[0]);
		console.log(event.target.files[0].name);
		console.log(event.target.files[0].size);
	}

	/* Take Uploaded File & Send to the Back End */
	fileUploadHandler = () => {
		/* Grab State */
		const {
            audioFile,
            crutchWords
		} = this.state;
		console.log(this.state.audioFile);
		console.log(this.state.crutchWords);

		// const fd = new FormData();
		/* Send File to Backend Server for Transcribing */
		// fd.append('audio', this.state.selectedFile, this.state.selectedFile.name);
		// console.log(this.state.selectedFile);

		/* POST Request to Backend. */
		fetch('api/account/transcribe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				audioFile: audioFile,
				crutchWords: crutchWords
			}),
			/* Logging the Progress of Uploading */
			// onUploadProgress: progressEvent => {
			// 	console.log('Upload Progress' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
			// 	console.log(body);
			// }
		}).then(res => res.json())
			.then(json => {
				console.log('join', json);
				if (json.success) {
					this.setState({
						uploadError: json.message,
						audioFile: '',
						crutchWords: ''
					});
					console.log(this.setState);
				} else {
					this.setState({
						uploadError: json.message,
					});
					console.log(this.setState);
				}
			});
	}
	/* End all of functions */

	render() {
		const {
			/* Upload Variables */
			uploadError,
			audioFile,
			crutchWords
		} = this.state;

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
															value={this.audioFile}
															onChange={this.onFileChangeAudioFile}
															// ref={fileInput => this.fileInput = fileInput}
														/>
													</FormGroup>
												</Col>
											</Row>
											<Row>
												<Col md={12}>
													<FormGroup controlId='formControlsTextarea'>
														<ControlLabel>
															Enter Your Crutch Words Here
															</ControlLabel>
														<FormControl
															rows='5'
															componentClass='textarea'
															bsClass='form-control'
															placeholder='Please separate each word by a semi colon (ex: word; word; word)'
															value={this.crutchWords}
															onChange={this.onTextBoxChangeCrutchWords}
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