import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card } from '../Card/Card';
import { StatsCard } from '../StatsCard/StatsCard';
import { Tasks } from '../Tasks/Tasks';
import ChartistGraph from 'react-chartist';
import Sidebar from '../Sidebar/Sidebar';
// import { getFromStorage } from '../utils/storage';

import { dataPie, legendPie, dataSales, optionsSales, responsiveSales, legendSales, dataBar, optionsBar, responsiveBar, legendBar } from '../../variables/Variables';
class Dashboard extends Component {
		constructor(props) {
			super(props);
			/* Set State */
			this.state = {
				isLoading: true,
				token: ''
				// redirect: true
			};
			console.log(this.props);
			/* Binding Logout functions to the constructor */
			// this.onLogOut = this.onLogOut.bind(this);
		}

	// componentDidMount() {
	// 	const obj = getFromStorage('papayas_app');
	// }
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
		// const {
		// 	isLoading,
		// 	signInError,
		// 	token
		// } = this.state;


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
											legend={
												<div className="legend">
													{this.createLegend(legendBar)}
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
										bigIcon={<i className='pe-7s-graph1'></i>}
										statsText='Total Words'
										statsValue='1034'
										statsIcon={<i className='fa fa-refresh'></i>}
										statsIconText='All Time'
									/>
								</Col>
								<Col lg={3} sm={6}>
									<StatsCard
										bigIcon={<i className='pe-7s-bandaid text-danger'></i>}
										statsText='Filler Words'
										statsValue='143'
										statsIcon={<i className='fa fa-calendar-o'></i>}
										statsIconText='All Time'
									/>
								</Col>
								<Col lg={3} sm={6}>
									<StatsCard
										bigIcon={<i className='pe-7s-folder'></i>}
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
										category="Proportion of my TalkTrack"
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