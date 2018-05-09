import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import 'whatwg-fetch';
import Button from '../../elements/CustomButton/CustomButton';
import avatar from '../../assets/img/faces/face-3.jpg';
import Sidebar from '../Sidebar/Sidebar';
import { Card } from '../Card/Card';
import { UserCard } from '../UserCard/UserCard';
import { getFromStorage } from '../utils/storage';
import ChartistGraph from 'react-chartist';
// import { dataBar } from '../../variables/Variables';

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
			transcriptionId: '',
			crutchWords: '',
			count: '',
			wordsLoading: true,
			chartData: '',
			dataBar: {
				labels: '',
				series: ''
			}
		}
		/* Binding the audio files & crutch words entered in the selected file & Crutch Words text box to the constructor */
		this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
		this.fileUploadHandler = this.fileUploadHandler.bind(this);
		// this.addCrutchWordsHandler = this.addCrutchWordsHandler.bind(this);

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
		/* Set State */
		this.setState({
			isLoading: true,
		});

		/* Send File to Backend Server for Transcribing */
		const obj = getFromStorage('papayas_app');
		const { token } = obj;

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
				console.log('transcriptionId:', json._id);
					if(json.success){
						this.setState({
							transcription: json.transcription,
							transcriptionId: json._id,
							isLoading: false
						});
					}else{
						this.setState({
							Error: json.message,
							isLoading: false
						})
				}
				console.log('?id=' + json._id);
				if (json._id) {
					let uri = '/api/account/words?id=' + json._id;

					const options = {
						method: 'GET',
						mode: 'cors'
					}

					const req = new Request(uri, options);
					console.log(req);

					fetch(req)
						.then(res => res.json())
						.then(json => {
							console.log(json.doc[0]);
							// console.log(json.doc[0].words);
							// console.log(json.doc[0].count);

							if (json.success) {
								this.setState({
									wordsLoading: false,
									crutchWords: json.doc[0].words,
									count: json.doc[0].count,
									dataBar: {
										labels: json.doc[0].words,
										series: json.doc[0].chartData
									}
								})
								console.log('this.state words\n==========');
								console.log(this.state.crutchWords);
								console.log(this.state.count);
								console.log('Current State\n==========');
								console.log(this.state);
								console.log('Current Props\n==========');
								console.log(this.state.props);
								console.log(this.props);
								/* Bar Chart for Crutch Words Said */
								// let ChartistGraph = () => {
								// 	let dataBar = {
								// 		labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
								// 		series: [
								// 			[5, 4, 3, 7, 5, 10, 3],
								// 			[3, 2, 9, 5, 4, 6, 4]
								// 		]
								// 	};
								// };
								// return (
								// 	<Bar data={data}/>
								// )
							} else {
								this.setState({
									wordsLoading: false
								})
							}
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
		// let ChartistGraph = () => {
		// 	let dataBar = {
		// 		labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		// 		series: [
		// 			[5, 4, 3, 7, 5, 10, 3],
		// 			[3, 2, 9, 5, 4, 6, 4]
		// 		]
		// 	};
		// };
		/* If the Audio File Has Been Uploaded & Transcribed Render this */
		return (
			<div className='wrapper'>
				<Sidebar {...this.props} />
				<div id='main-panel' className='main-panel'>
					<Grid fluid>
						<Row>
						<Col md={8}>
							<div className="TranscriptionItems">
								<h3><strong>Latest Transcriptions</strong></h3>
									<p>{this.state.transcription}</p>
									<h3><strong>Crutch Words Said</strong></h3>
									<p>{this.state.crutchWords}</p>
									<h3><strong>Count of Crutch Words Said</strong></h3>
									<p>{this.state.count}</p>
									<div className="ct-chart">
										<ChartistGraph
											data={this.state.dataBar}
											type="Bar"
										/>
									</div>
								<Button
									bsStyle='info'
									className='AddCrutchWords'
									// style={{ display: 'none' }}
									pullRight
									fill
									href='/dashboard'
									onClick={this.addCrutchWordsHandler}>
									Add Crutch Words to Dashboard
									</Button>
								<div className='clearfix'></div>
								</div>
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
}

export default TranscribeAudio;