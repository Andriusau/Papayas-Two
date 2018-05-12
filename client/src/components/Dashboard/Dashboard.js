import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card } from '../Card/Card';
import { StatsCard } from '../StatsCard/StatsCard';
import { Tasks } from '../Tasks/Tasks';
import ChartistGraph from 'react-chartist';
import Sidebar from '../Sidebar/Sidebar';
import { getFromStorage } from '../utils/storage';

import { dataPie, legendPie, dataSales, optionsSales, responsiveSales, legendSales, dataBar, optionsBar, responsiveBar } from '../../variables/Variables';
class Dashboard extends Component {
		constructor(props) {
			super(props);
			/* Set State */
			this.state = {
				isLoading: true,
				token: ''
			};
			console.log(this.props);
		}
	/* Initialization that requires DOM nodes should go here is invoked immediately after a component is mounted */
	componentDidMount() {
		const obj = getFromStorage('papayas_app');
		if (obj && obj.token) {
			const {
				token
			} = obj;
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
	createLegend(json) {
        var legend = [];
        for(var i = 0; i < json["names"].length; i++){
            var type = "fa fa-circle text-"+json["types"][i];
            legend.push(
                <i className={type} key={i}></i>
            );
            legend.push(" ");
            legend.push(
                json["names"][i]
            );
        }
        return legend;
    }
	render() {
		const {
			token,
			isLoading
		} = this.state;

		/* If the Audio File Has Not Been Uploaded & Transcribed Render this */
		if (isLoading) {
			return (<div><h3>Geniuses at Work...</h3></div>);
		}

		/* If the page has finished loading but there is no token when we look for it in getFromStorage, then render these elements */
		if (!token) {
			return (<div><h3>Please Sign In</h3></div>);
		}
		return (
			<div className='wrapper'>
				<Sidebar {...this.props} />
				<div id='main-panel' className='main-panel'>
					<h1>Welcome to Like Um Dashboard!</h1>

					<div className='content'>
						<Grid fluid>
							<Row>
								<Col lg={12}>
										<Card
											id="chartActivity"
											title="Crutch Count"
											category="What am I even saying?"
											stats="Data information certified"
											statsIcon="fa fa-check"
											content={
												<div className="ct-chart">
													<ChartistGraph
														data={dataBar}
														type="Bar"
														options={optionsBar}
														responsiveOptions={responsiveBar}
													/>
												</div>
											}

										/>
								</Col>
							</Row>
							<Row>
								<Col lg={12}>
									<Card
										title="Transcriptions"
										category="Historical conversations"
										stats="Updated 3 minutes ago"
										statsIcon="fa fa-history"
										content={
											<div className="table-full-width">
												<table className="table">
													<Tasks />
												</table>
											</div>
										}
									/>
								</Col>
							</Row>
							<Row>
								<Col lg={3} sm={6}>
									<StatsCard
										bigIcon={<i className='pe-7s-graph1 text-success'></i>}
										statsText='Total Words'
										statsValue='1034'
										statsIcon={<i className='fa fa-refresh'></i>}
										statsIconText='All Time'
									/>
								</Col>
								<Col lg={3} sm={6}>
									<StatsCard
										bigIcon={<i className='pe-7s-bandaid text-warning'></i>}
										statsText='Filler Words'
										statsValue='143'
										statsIcon={<i className='fa fa-calendar-o'></i>}
										statsIconText='All Time'
									/>
								</Col>
								<Col lg={3} sm={6}>
									<StatsCard
										bigIcon={<i className='pe-7s-folder text-info'></i>}
										statsText='Total Files'
										statsValue='23'
										statsIcon={<i className='fa fa-clock-o'></i>}
										statsIconText='Last Upload'
									/>
								</Col>
								<Col lg={3} sm={6}>
									<StatsCard
										bigIcon={<i className="pe-7s-flag text-danger"></i>}
										statsText='Avg Per File'
										statsValue="8"
										statsIcon={<i className="fa fa-refresh"></i>}
										statsIconText="Last Upload"
									/>
								</Col>
							</Row>
							<Row>
								<Col md={8}>
									<Card
										statsIcon="fa fa-history"
										id="chartHours"
										title="Track my Progress"
										category="How have I improved?"
										stats="Updated 3 minutes ago"
										content={
											<div className="ct-chart">
												<ChartistGraph
													data={dataSales}
													type="Line"
													options={optionsSales}
													responsiveOptions={responsiveSales}
												/>
											</div>
										}
										legend={
											<div className="legend">
												{this.createLegend(legendSales)}
											</div>
										}
									/>
								</Col>
								<Col md={4}>
									<Card
										statsIcon="fa fa-clock-o"
										title="Break it Down"
										id="progress"
										category="Conversation Breakdown"
										stats="Audio sent 2 minutes ago"
										content={
											<div id="chartPreferences" className="ct-chart ct-perfect-fourth">
												<ChartistGraph data={dataPie} type="Pie" />
											</div>
										}
										legend={
											<div className="legend">
												{this.createLegend(legendPie)}
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
	}
}

export default Dashboard;