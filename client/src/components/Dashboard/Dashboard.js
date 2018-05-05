import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card } from '../Card/Card';
import { StatsCard } from '../StatsCard/StatsCard';
import { Tasks } from '../Tasks/Tasks';
import ChartistGraph from 'react-chartist';
import Sidebar from '../Sidebar/Sidebar';

import { dataPie, legendPie, dataSales, optionsSales, responsiveSales, legendSales, dataBar, optionsBar, responsiveBar, legendBar } from '../../variables/Variables';
class Dashboard extends Component {

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
								<Col lg={3} sm={6}>
									<StatsCard
										bigIcon={<i className='pe-7s-server text-warning'></i>}
										statsText='Capacity'
										statsValue='105GB'
										statsIcon={<i className='fa fa-refresh'></i>}
										statsIconText='Updated Now'
									/>
								</Col>
								<Col lg={3} sm={6}>
									<StatsCard
										bigIcon={<i className='pe-7s-wallet text-success'></i>}
										statsText='Revenue'
										statsValue='$1,345'
										statsIcon={<i className='fa fa-calendar-o'></i>}
										statsIconText='Last Day'
									/>
								</Col>
								<Col lg={3} sm={6}>
									<StatsCard
										bigIcon={<i className='pe-7s-graph1 text-danger'></i>}
										statsText='Errors'
										statsValue='23'
										statsIcon={<i className='fa fa-clock-o'></i>}
										statsIconText='Last Transcribed Audio File'
									/>
								</Col>
								<Col lg={3} sm={6}>
									<StatsCard
										bigIcon={<i className="pe-7s-cloud-upload"></i>}
										statsText="Followers"
										statsValue="+45"
										statsIcon={<i className="fa fa-refresh"></i>}
										statsIconText="Updated now"
									/>
								</Col>
							</Row>
							<Row>
								<Col md={8}>
									<Card
										statsIcon="fa fa-history"
										id="chartHours"
										title="Users Behavior"
										category="24 Hours performance"
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
										title="Percentage of Audio File"
										category="Since Last Audio Upload"
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

							<Row>
								<Col md={6}>
									<Card
										id="chartActivity"
										title="2014 Sales"
										category="All products including Taxes"
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

								<Col md={6}>
									<Card
										title="Tasks"
										category="Backend development"
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

						</Grid>
					</div>

				</div>

			</div>
		);
	}
}

export default Dashboard;