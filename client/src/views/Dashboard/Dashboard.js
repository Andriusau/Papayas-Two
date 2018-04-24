import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';


import {Card} from 'components/Card/Card.jsx';
import {StatsCard} from 'components/StatsCard/StatsCard.jsx';
import {Tasks} from 'components/Tasks/Tasks.jsx';
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar
} from '../../variables/Variables';

class Dashboard extends Component {
    createLegend(json){
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
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
							<h2>
								StatsCard Component
							</h2>
                        </Col>
                        <Col lg={3} sm={6}>
                            <h2>
								StatsCard Component
							</h2>
                        </Col>
                        <Col lg={3} sm={6}>
                            <h2>
								StatsCard Component
							</h2>
                        </Col>
                        <Col lg={3} sm={6}>
                            <h2>
								StatsCard Component
							</h2>
                        </Col>
                    </Row>
                    <Row>
						<Col md={8}>
							<h3>
								Card Component
							</h3>
                        </Col>
						<Col md={4}>
							<h3>
								Card Component
							</h3>
                        </Col>
                    </Row>

                    <Row>
						<Col md={6}>
							<h3>
								Card Component
							</h3>
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
											<h4>
												StatsCard Component
											</h4>
                                        </table>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>

                </Grid>
            </div>
        );
    }
}

export default Dashboard;
