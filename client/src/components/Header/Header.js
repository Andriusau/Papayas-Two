import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component{
    render(){
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
				<div className="container">
					<a className="navbar-brand" href="/">Like Um</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item active">
								<Link to="/" className="nav-link"> Sign Up</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/signin"> Sign In</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/logout"> Log Out</Link>
							</li>
						</ul>
					</div>
				</div>
            </nav>
        );
    }
}

export default Header;
