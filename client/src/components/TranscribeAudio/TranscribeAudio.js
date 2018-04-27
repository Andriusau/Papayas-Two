import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import 'whatwg-fetch';
import Button from '../../elements/CustomButton/CustomButton';
import avatar from '../../assets/img/faces/face-3.jpg';
import Sidebar from '../Sidebar/Sidebar';
import { Card } from '../Card/Card';
import { UserCard } from '../UserCard/UserCard';
import { appendFile } from 'fs';
import FileInputComponent from 'react-file-input-previews-base64';

class TranscribeAudio extends Component {
	/* Set State */
	state = {
		selectedFile: null
	}
	/* Select a File */
	fileSelectedHandler = event => {
		this.setState({
			selectedFile: event.target.files[0]
		});
		// console.log(event.target.files[0].name);
	}

	/* Upload a File */
	fileUploadHandler = () => {
		/* Send File to Backend Server for Transcribing */
		appendFile(this.state.selectedFile, this.state.selectedFile.name);
		fetch('api/account/transcribe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: this.state.selectedFile,
			/* Logging the Progress of Uploading */
			onUploadProgress: progressEvent => {
				console.log('Upload Progress' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
			}
		}).then(res => {
			// console.log(res);
		})
	}
	render() {
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
												<FileInputComponent
												rows='5'
												style={{ display: 'none', labelText: 'none' }}
												labelText='CHOOSE AUDIO FILE'
												multiple={false}
												callbackFunction={(file_arr) => { console.log(file_arr.base64) }}
												accept="audio/wav"
												/>
												<br />
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
													/>
												</FormGroup>
                                            </Col>
                                        </Row>
                                        <Button
											bsStyle='info'
											pullRight
											fill
											type='submit'
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
		);
	}
}

export default TranscribeAudio;